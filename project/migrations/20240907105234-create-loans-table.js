"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Loans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      loan_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      interest_rate: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      loan_tenure_months: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      emi: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      prepayment_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      remaining_balance: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Loans");
  },
};
