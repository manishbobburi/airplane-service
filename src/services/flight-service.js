const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/errors");
const { FlightRepository } = require("../repositories");

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

module.exports = {
    createFlight,
};