'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Jobs', 'EducationId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Educations'
        },
        key: 'id'
      },
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Jobs', 'EducationId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Educations'
        },
        key: 'id'
      },
      allowNull: false
    })
  }
};
