const { Logger } = require("../config");
const  { AirplaneRepository } = require("../repositories");

const airplaneRepository = AirplaneRepository();

async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createAirplane,
}