const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/errors/")
const  { AirplaneRepository } = require("../repositories");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        if(error.name == "SequelizeValidationError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError("cannot create a new airplane object", StatusCodes.BAD_REQUEST);
    }
}

module.exports = {
    createAirplane,
}