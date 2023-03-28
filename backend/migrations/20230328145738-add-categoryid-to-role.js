'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Roles', 'CategoryId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Categories'
        },
        key: 'id'
      },
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Roles', 'CategoryId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Categories'
        },
        key: 'id'
      },
      allowNull: false
    })
  }
};
