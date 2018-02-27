const Sequelize = require("sequelize");
const sequelize = require("./db_connect");
const gmp = {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  ent_id: {
    type: Sequelize.STRING,
    allowNull: false
  },
  gmp_id: {
    type: Sequelize.STRING,
    allowNull: false
  },
  region: {
    type: Sequelize.STRING,
    allowNull: false
  },
  gmp_num: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ent_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  appr_range: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sign_time: {
    type: Sequelize.STRING,
    allowNull: false
  },
  expire_time: {
    type: Sequelize.STRING,
    allowNull: false
  },
  appr_ext_time: {
    type: Sequelize.STRING,
    allowNull: false
  },
  exp_ext_time: {
    type: Sequelize.STRING,
    allowNull: false
  },
  appr_ext_range: {
    type: Sequelize.STRING,
    allowNull: false
  },
  gmp_class: {
    type: Sequelize.STRING,
    allowNull: false
  },
  remarks: {
    type: Sequelize.STRING,
    allowNull: false
  }
};

module.exports = sequelize.define("gmp", gmp, { freezeTableName: true });
