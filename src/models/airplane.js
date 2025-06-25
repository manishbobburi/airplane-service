'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Airplane.init({
    modelNum: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      },
    },
    capacity: {
      type: DataTypes.INTEGER,
      validate: {
        max: 1000,
        isAlphanumeric: true,
      },
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Airplane',
  });
  return Airplane;
};