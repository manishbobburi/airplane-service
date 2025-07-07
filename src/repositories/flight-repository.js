const CrudRepository = require("./crud-repository");
const db = require("../models");
const { Flight, Airport, Airplane, City} = require("../models");
const { addRowLock } = require("./queries");

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

    async updateRemainingSeats(flightId, seats, dec = 1) {
        await db.sequelize.query(addRowLock(flightId));
        const flight = await Flight.findByPk(flightId);
        if(parseInt(dec)) {
            await flight.decrement('totalSeats', {by : seats});
        } else {
            await flight.increment('totalSeats', {by: seats});
        }
        await flight.reload();
        return flight;
    }
}

module.exports = FlightRepository;