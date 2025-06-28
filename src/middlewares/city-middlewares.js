const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/errors");
const { ErrorResponse } = require("../utils/common");

async function validateCityName(req, res, next) {
    if(!req.body.name) {
        ErrorResponse.message = "Something went wrong while creating city";
        ErrorResponse.error = new AppError(["City name not found in the incoming request"]);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCityName,
}