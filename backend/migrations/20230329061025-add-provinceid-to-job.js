'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Locations', 'ProvinceId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Provinces'
        },
        key: 'id'
      },
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Locations', 'ProvinceId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Provinces'
        },
        key: 'id'
      },
      allowNull: false
    })
  }
};
