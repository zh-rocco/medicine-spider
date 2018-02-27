const Sequelize = require("sequelize");
const sequelize = require("./db_connect");
const domestic_medicine = {
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
  med_id: {
    type: Sequelize.STRING,
    allowNull: false
  },
  appr_num: {
    type: Sequelize.STRING,
    allowNull: false
  },
  prod_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  en_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  comm_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dosage_form: {
    type: Sequelize.STRING,
    allowNull: false
  },
  specification: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ent_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ent_addr: {
    type: Sequelize.STRING,
    allowNull: false
  },
  prod_class: {
    type: Sequelize.STRING,
    allowNull: false
  },
  appr_time: {
    type: Sequelize.STRING,
    allowNull: false
  },
  appr_num_o: {
    type: Sequelize.STRING,
    allowNull: false
  },
  std_code: {
    type: Sequelize.STRING,
    allowNull: false
  },
  std_code_d: {
    type: Sequelize.STRING,
    allowNull: false
  }
};

module.exports = sequelize.define("domestic_medicine", domestic_medicine, { freezeTableName: true });
