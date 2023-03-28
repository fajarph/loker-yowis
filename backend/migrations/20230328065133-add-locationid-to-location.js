'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Jobs', 'LocationId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Locations'
        },
        key: 'id'
      },
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Jobs', 'LocationId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Locations'
        },
        key: 'id'
      },
      allowNull: false
    })
  }
};
