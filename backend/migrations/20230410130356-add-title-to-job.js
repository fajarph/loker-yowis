'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Jobs', 'titleCompanny', {
      type: Sequelize.DataTypes.STRING,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Jobs', 'titleCompanny', {
      type: Sequelize.DataTypes.STRING,
    })
  }
};
