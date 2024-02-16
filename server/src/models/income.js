const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Income = sequelize.define('Income', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nominal: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  tujuan: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tanggal: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'incomes',
  timestamps: true
});

module.exports = Income;