'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable("Links", {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.BIGINT,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable("Links");
  }
};
