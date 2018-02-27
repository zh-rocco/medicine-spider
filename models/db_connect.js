const Sequelize = require("sequelize");
const config = require("../config/db_config");

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: "mysql",
  operatorsAliases: false,
  logging: false,
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
  define: { timestamps: false },
  timezone: "+08:00"
});

module.exports = sequelize;
