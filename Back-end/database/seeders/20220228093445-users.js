'use strict';

const bcrypt = require('bcrypt')

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

    await queryInterface.bulkInsert('Users', [
      {
        firstName: "John",
        lastName: "Doe",
        email:"john.doe@gmail.com",
        password: bcrypt.hashSync('secret',10),
        gender: 'male'
      },
      {
        firstName: "Nam",
        lastName: "Nguyen",
        email:"nam@gmail.com",
        password: bcrypt.hashSync('secret',10),
        gender: 'male'
      },
      {
        firstName: "Hai",
        lastName: "Nguyen",
        email:"hai@gmail.com",
        password: bcrypt.hashSync('secret',10),
        gender: 'male'
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};
