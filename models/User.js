// models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importa nossa conexão

const User = sequelize.define('User', {
  // Definimos as colunas da nossa tabela 'users'
  name: {
    type: DataTypes.STRING,
    allowNull: false // O nome não pode ser nulo
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // O email deve ser único
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Opções adicionais do model
  tableName: 'users' // Garante que o nome da tabela seja 'users'
});

module.exports = User;