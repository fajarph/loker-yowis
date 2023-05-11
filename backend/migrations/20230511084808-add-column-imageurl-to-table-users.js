'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'imageUrl', {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'imageUrl', {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: true
    })
  }
};
