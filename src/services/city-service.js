const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/errors");
const { CityRepository } = require("../repositories");

const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        if(error.name == "SequelizeValidationError" || "SequelizeUniqueConstraintError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Failed to create a new city object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createCity,
};