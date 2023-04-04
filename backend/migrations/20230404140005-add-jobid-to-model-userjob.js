'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('UserJobs', 'JobId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Jobs'
        },
        key: 'id'
      },
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('UserJobs', 'JobId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Jobs'
        },
        key: 'id'
      },
      allowNull: false
    })
  }
};
