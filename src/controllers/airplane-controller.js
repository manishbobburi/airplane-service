const  { AirplaneService } = require("../services/");
const { StatusCodes } = require("http-status-codes");

async function createAirplane(req, res) {
    try {
        const airplane = AirplaneService.createAirplane({
            modelNum: req.body.modelNumber,
            capacity: req.body.capacity,
        });
        return res
                .status(StatusCodes.CREATED)
                .json({
                    success: true,
                    message: "Successfully create an airplane",
                    data: airplane,
                    error: {}
                });
    } catch (error) {
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({
                    success: false,
                    message: "Something went wrong while creating airplane",
                    data: {},
                    error: error
                });
    }
}

module.exports = {
    createAirplane,
}