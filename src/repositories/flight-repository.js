const CrudRepository = require("./crud-repository");
const { Flight } = require("../models");
const { where } = require("sequelize");

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getFlights(filter) {
        const flights = await Flight.findAll({
            where: filter,
        });
        return flights;
    }
}

module.exports = FlightRepository;