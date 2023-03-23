'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.changeColumn('Jobs', 'jobLongDescription', {
      type: Sequelize.STRING(10000),
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.changeColumn('Jobs', 'jobLongDescription', {
      type: Sequelize.STRING(10000),
      allowNull: false
    });
  }
};
