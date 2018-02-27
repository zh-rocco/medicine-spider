const Sequelize = require("sequelize");
const sequelize = require("./db_connect");
const qa = {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  cid: {
    type: Sequelize.STRING,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false
  },
  question: {
    type: Sequelize.STRING,
    allowNull: false
  },
  reply: {
    type: Sequelize.STRING,
    allowNull: false
  }
};

module.exports = sequelize.define("qa", qa, { freezeTableName: true });
