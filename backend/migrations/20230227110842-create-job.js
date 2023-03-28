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
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        validate:{
          notEmpty: true
        }
      },
      companyName: {
        type: Sequelize.STRING
      },
      companyAddress: {
        type: Sequelize.STRING
      },
      salary: {
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
      image: {
        type: Sequelize.STRING
      },
      url: {
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