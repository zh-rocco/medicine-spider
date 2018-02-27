const Sequelize = require("sequelize");
const sequelize = require("./db_connect");
const enterprise = {
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
  ent_num: {
    type: Sequelize.STRING,
    allowNull: false
  },
  org_code: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cat_code: {
    type: Sequelize.STRING,
    allowNull: false
  },
  region: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ent_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  leg_person: {
    type: Sequelize.STRING,
    allowNull: false
  },
  res_person: {
    type: Sequelize.STRING,
    allowNull: false
  },
  qa_person: {
    type: Sequelize.STRING,
    allowNull: false
  },
  reg_addr: {
    type: Sequelize.STRING,
    allowNull: false
  },
  prod_addr: {
    type: Sequelize.STRING,
    allowNull: false
  },
  prod_range: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lic_time: {
    type: Sequelize.STRING,
    allowNull: false
  },
  expire_time: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sign_office: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sign_person: {
    type: Sequelize.STRING,
    allowNull: false
  },
  regulator: {
    type: Sequelize.STRING,
    allowNull: false
  },
  supervisors: {
    type: Sequelize.STRING,
    allowNull: false
  }
};

module.exports = sequelize.define("enterprise", enterprise, { freezeTableName: true });
