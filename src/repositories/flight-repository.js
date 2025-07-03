const CrudRepository = require("./crud-repository");
const { Flight } = require("../models");
const { where } = require("sequelize");

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getFlights(filter, sort) {
        const flights = await Flight.findAll({
            where: filter,
            order: sort,
        });
        return flights;
    }
}

module.exports = FlightRepository;