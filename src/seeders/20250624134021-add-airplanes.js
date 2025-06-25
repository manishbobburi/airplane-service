const { Op } = require("sequelize")
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Airplanes', 
    [{
        modelNum: "airbus A320",
        capacity: 800,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNum: "airbus A380",
        capacity: 432,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNum: "boeing 777",
        capacity: 320,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNum: "boeing 737",
        capacity: 412,
        createdAt: new Date(),
        updatedAt: new Date(),
  }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     * await queryInterface.bulkDelete('People', null, {});
     * revert seed based on values.. using Op
     */
    await queryInterface.bulkDelete('Airplanes', 
      {
        [Op.or]: [
          {modelNum: "airbus A320"},
          {modelNum: "boeing 737"},
        ]
      });
  }
};
