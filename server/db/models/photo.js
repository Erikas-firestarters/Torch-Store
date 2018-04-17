const Sequelize = require('sequelize')
const db = require('../db')


const Photo = db.define('photo', {
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'https://loremflickr.com/320/240/dog',
    validate: {
      isUrl: true
    }
  }
})

module.exports = Photo
