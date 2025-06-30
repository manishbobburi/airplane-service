const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils/errors");

function validateCreateAirport(req, res, next) {
    if(!req.body.name) {
        ErrorResponse.message = "Something went wrong while creating airport";
        ErrorResponse.error = new AppError(["Expected name in the request, but it was missing or malformed."]);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    if(!req.body.code) {
        ErrorResponse.message = "Something went wrong while creating airport";
        ErrorResponse.error = new AppError(["Expected code in the request, but it was missing or malformed."]);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    if(!req.body.cityId) {
        ErrorResponse.message = "Something went wrong while creating airport";
        ErrorResponse.error = new AppError(["Expected cityId in the request, but it was missing or malformed."]);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateAirport,
}