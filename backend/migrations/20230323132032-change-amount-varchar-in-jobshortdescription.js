'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.changeColumn('Jobs', 'jobShortDescription', {
      type: Sequelize.STRING(1000),
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.changeColumn('Jobs', 'jobShortDescription', {
      type: Sequelize.STRING(1000),
      allowNull: false
    });
  }
};
