const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/errors");
const { ErrorResponse } = require("../utils/common");
const { dateTimeHelper } = require("../utils/helpers/");

function validateCreateRequest(req, res, next) {
  const requiredFields = [
    "flightNumber",
    "airplaneId",
    "departureAirportId",
    "arrivalAirportId",
    "departureTime",
    "arrivalTime",
    "price",
    "totalSeats",
  ];

  let errors = [];

  requiredFields.forEach((field) => {
    if (!req.body[field]) {
      errors.push(`${field} is required`);
    }
  });

  if (
    req.body.arrivalTime &&
    req.body.departureTime &&
    !dateTimeHelper(req.body.arrivalTime, req.body.departureTime)
  ) {
    errors.push(
      "Invalid arrivalTime and departureTime. Ensure arrival is after departure."
    );
  }

  if(req.body.price !== undefined) {
    if(isNaN(req.body.price)) {
      errors.push("Price must be a number.")
    } else if (req.body.price < 0){
      errors.push("Price cannot be less than zero.");
    }
    req.body.price = Number(req.body.price);
  }

  if (req.body.totalSeats !== undefined) {
    const seats = Number(req.body.totalSeats);
    if (!Number.isInteger(seats) || seats < 0) {
      errors.push("totalSeats must be a non-negative integer.");
    } else {
      req.body.totalSeats = seats;
    }
  }

  if (errors.length > 0) {
    ErrorResponse.message = "Something went wrong while creating flight.";
    ErrorResponse.error = new AppError(errors);
    return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
};
