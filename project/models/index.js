const sequelize = require("../config/database");
const Loan = require("./loan");

const db = {
  sequelize,
  Sequelize: sequelize.Sequelize,
  Loan: Loan(sequelize, sequelize.Sequelize.DataTypes),
};

module.exports = db;
