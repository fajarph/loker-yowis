'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Jobs', 'LevelId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Levels'
        },
        key: 'id'
      },
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Jobs', 'LevelId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Levels'
        },
        key: 'id'
      },
      allowNull: false
    })
  }
};
