module.exports = {
  development: {
    username: "emiuser",
    password: "emipassword",
    database: "emi_db",
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  },
};
