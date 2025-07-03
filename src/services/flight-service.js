const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/errors");
const { FlightRepository } = require("../repositories");
const { Op } = require("sequelize")

const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        if(error.name == "SequelizeValidationError" || "SequelizeUniqueConstraintError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Failed to create a new flight object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlights(query) {
    let customFilter = {};
    let sortFliter = {};
    if(query.trips) {
        const [departureAirportId, arrivalAirportId] = query.trips.split("-");
        if(departureAirportId == arrivalAirportId) {
            throw new AppError("Arrival and destination airports cannot be same.", StatusCodes.BAD_REQUEST);
        }
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }
    if(query.price) {
        const [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
          [Op.between]: [minPrice, maxPrice === undefined ? 20000 : maxPrice],
        };
    }
    if(query.travellers) {
        customFilter.totalSeats = {
          [Op.gt]: query.travellers,
        };
    }
    if (query.departure) {
        const datePart = query.departure;
        if (isNaN(Date.parse(datePart))) {
            throw new AppError("Invalid departure date provided", StatusCodes.BAD_REQUEST);
        }
        const start = new Date(`${datePart}T00:00:00+05:30`).toISOString();
        const end = new Date(`${datePart}T23:59:59.999+05:30`).toISOString();
        customFilter.departureTime = {
            [Op.between]: [start, end],
        };
    }
    if(query.sort) {
        const params = query.sort.split(",");
        const sortFliters = params.map((param) => param.split("_"));
        sortFliter = sortFliters;
    }
    try {
        const flights = await flightRepository.getFlights(customFilter, sortFliter);
        return flights;
    } catch (error) {
        console.log("hello");
        if(error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError(`No flights with matching filters found`, error.statusCode);
        }
        throw new AppError("Failed to retrieve flights", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createFlight,
    getFlights,
};