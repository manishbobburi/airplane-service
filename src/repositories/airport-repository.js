const CrudRepository = require("./crud-repository");
const { Airport, City } = require("../models");

class AirportRepository extends CrudRepository {
    constructor() {
        super(Airport);
    }

    async getAll() {
        const response = await Airport.findAll({
            include:[
                {
                    model: City,
                    as: 'cityDetail',
                    attributes: ['id', 'name'],
                }
            ]
        });
        return response;
    }
}

module.exports = AirportRepository;