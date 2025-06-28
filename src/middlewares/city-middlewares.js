const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/errors");
const { ErrorResponse } = require("../utils/common");

function validateCityName(req, res, next) {
    if(!req.body.name) {
        ErrorResponse.message = "City name not found in the incoming request";
        ErrorResponse.error = new AppError(["City name is required"]);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCityName,
}