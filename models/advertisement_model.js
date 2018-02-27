const Sequelize = require("sequelize");
const sequelize = require("./db_connect");
const advertisement = {
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
  ad_id: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ad_app_num: {
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
  zipcode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  comm_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  prod_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  brand_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  prescription: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ad_type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ad_time: {
    type: Sequelize.STRING,
    allowNull: false
  },
  expire_time: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ad_content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  app_num: {
    type: Sequelize.STRING,
    allowNull: false
  },
  remarks: {
    type: Sequelize.STRING,
    allowNull: false
  }
};

module.exports = sequelize.define("advertisement", advertisement, { freezeTableName: true });
