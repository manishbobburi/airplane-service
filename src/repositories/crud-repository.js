const { Logger } = require("../config/index");

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        return response;
    }

    async destroy(data) {
        try {
            const response = await this.model.destroy({
                where: {
                   id: data,
                },
            });
            return response;
        } catch (error) {
            Logger.error("Some thing went wrong in the Crud Repo: destroy");
            throw error;
        }
    }

    async get(data) {
        try {
            const response = await this.model.findByPk(data);
            return response;
        } catch (error) {
            Logger.error("Some thing went wrong in the Crud Repo: get");
            throw error;
        }
    }

    async getAll() {
        try {
            const response = await this.model.findAll();
            return response;
        } catch (error) {
            Logger.error("Some thing went wrong in the Crud Repo: getAll");
            throw error;
        }
    }

    async update(id, data) { // data -> {key: value, ...}
        try {
            const response = await this.model.update(data, {
                id: id,
            });
            return response;
        } catch (error) {
            Logger.error("Some thing went wrong in the Crud Repo: update");
            throw error;
        }
    }

}

module.exports = CrudRepository;