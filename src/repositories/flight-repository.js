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

    async get(id) {
        const flights = await Flight.findByPk(id, {
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

    async updateRemainingSeats(flightId, seats, dec = true) {
        const transaction = await db.sequelize.transaction();
        await db.sequelize.query(addRowLock(flightId));
        const flight = await Flight.findByPk(flightId);
        if(+dec) {
            await flight.decrement('totalSeats', {by : seats}, {transaction: transaction});
        } else {
            await flight.increment('totalSeats', {by: seats}, {transaction: transaction});
        }
        await transaction.commit();
        await flight.reload();
        return flight;
    }
}

module.exports = FlightRepository;