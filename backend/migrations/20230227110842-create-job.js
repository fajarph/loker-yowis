'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      companyName: {
        type: Sequelize.STRING
      },
      companyAddress: {
        type: Sequelize.STRING
      },
      salery: {
        type: Sequelize.STRING
      },
      jobRole: {
        type: Sequelize.STRING
      },
      jobLevel: {
        type: Sequelize.STRING
      },
      jobType: {
        type: Sequelize.STRING
      },
      jobShortDescription: {
        type: Sequelize.STRING
      },
      jobLongDescription: {
        type: Sequelize.STRING
      },
      education: {
        type: Sequelize.STRING
      },
      industry: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Jobs');
  }
};