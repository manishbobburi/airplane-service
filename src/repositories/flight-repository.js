const CrudRepository = require("./crud-repository");
const { Flight, Airport } = require("../models");

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getFlights(filter, sort) {
        const flights = await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Airport,
                    as: 'DepartureAirport',
                    attributes: ['id', 'name', 'code', 'cityId']
                },
                {
                    model: Airport,
                    as: 'ArrivalAirport',
                    attributes: ['id', 'name', 'code', 'cityId']
                }
            ]
        });
        return flights;
    }
}

module.exports = FlightRepository;