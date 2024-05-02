const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect:'sqlite', 
    storage: './DB/database.sqlite',
    database: './DB/database.sqlite',
  });

const Musique = sequelize.define('Musique', {
  title: {
    type: DataTypes.STRING,
    
  },
  src: {
    type: DataTypes.STRING,
    
  },
  image: {
    type: DataTypes.STRING,
    
  }
});

module.exports = Musique;