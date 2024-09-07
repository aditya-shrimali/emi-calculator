"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Loan extends Model {
    static associate(models) {
      // define associations here
    }
  }
  Loan.init(
    {
      loan_amount: DataTypes.DECIMAL(10, 2),
      interest_rate: DataTypes.DECIMAL(5, 2),
      loan_tenure_months: DataTypes.INTEGER,
      emi: DataTypes.DECIMAL(10, 2),
      prepayment_amount: DataTypes.DECIMAL(10, 2),
      remaining_balance: DataTypes.DECIMAL(10, 2),
    },
    {
      sequelize,
      modelName: "Loan",
    }
  );
  return Loan;
};
