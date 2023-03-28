'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Jobs', 'RoleId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Roles'
        },
        key: 'id'
      },
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Jobs', 'RoleId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Roles'
        },
        key: 'id'
      },
      allowNull: false
    })
  }
};
