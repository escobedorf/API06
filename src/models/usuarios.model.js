//const {Sequelize, DataTypes} = require('sequelize')
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  clave: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Usuario.sync()
  .then(() => {
    console.log('Tabla Usuario creada o ya existente');
  })
  .catch((error) => {
    console.error('Error al crear la tabla Usuario', error);
  });

module.exports = Usuario;










