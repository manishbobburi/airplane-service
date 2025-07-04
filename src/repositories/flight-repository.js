const CrudRepository = require("./crud-repository");
const { Flight, Airport, Airplane, City} = require("../models");

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
                    model: Airplane,
                    as: 'airplaneDetail',
                    attributes: ['id', 'modelNum', 'capacity'],                   
                },
                {
                    model: Airport,
                    as: 'departureAirport',
                    attributes: ['id', 'name', 'code', 'cityId'],
                    include: {
                        model: City,
                        as: 'cityDetail',
                        attributes: ['id', 'name'],           
                    }
                },
                {
                    model: Airport,
                    as: 'arrivalAirport',
                    attributes: ['id', 'name', 'code', 'cityId'],
                    include: {
                        model: City,
                        as: 'cityDetail',
                        attributes: ['id', 'name'],                      
                    }
                }
            ]
        });
        return flights;
    }
}

module.exports = FlightRepository;