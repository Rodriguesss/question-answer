const Sequelize = require('sequelize');

const connection = new Sequelize('perguntaresposta', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = connection;