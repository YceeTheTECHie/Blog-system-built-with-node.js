'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [
      {
        name : 'Programming'
      },

      {
        name : 'Software Engineering'
      },

      {
        name : 'Javascript'
      },

      {
        name : 'Python'
      },

      {
        name : 'Golang'
      },

      {
        name : 'c#'
      },

      {
        name : 'Swift'
      },

      {
        name : 'Solidity'
      },

      {
        name : 'Rust'
      }
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories',{},null)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
