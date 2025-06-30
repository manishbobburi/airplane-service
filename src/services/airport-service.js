const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/errors/")
const  { AirportRepository } = require("../repositories");

const airportRepository = new AirportRepository();

async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data); 
        return airport;
    } catch (error) {
        if(error.name == "SequelizeValidationError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Failed to create a new airport object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports() {
    try {
        const airport = await airportRepository.getAll();
        return airport;
    }   catch(error) {
        throw new AppError("Failed to retrive airport", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id) {
    try {
        const airport = await airportRepository.get(id);
        return airport;
    } catch(error) {
        if(error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError(`No airport with ID: ${id}`, error.statusCode);
        }
        throw new AppError("Failed to retrive airport", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirport(id) {
    try {
        const response = await airportRepository.destroy(id);
        return response;
    } catch(error) {
        if(error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError(`No airport with ID: ${id}`, error.statusCode);
        }
        throw new AppError("Failed to delete airport", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirport(id, data) {
    try {
        const response = await airportRepository.update(id, data);
        return response;
    } catch(error) {
        if(error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError(`No airport with ID: ${id}`, error.statusCode);
        }
        throw new AppError("Failed to update airport details", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport,
}