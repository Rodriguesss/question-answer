const Sequelize = require('sequelize');

const connection = new Sequelize('perguntaresposta', 'root', '10081999', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = connection;