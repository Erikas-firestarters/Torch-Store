const Sequelize = require('sequelize')
const db = require('../db')


const Photo = db.define('photo', {
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'https://react.semantic-ui.com/assets/images/wireframe/image.png',
    validate: {
      isUrl: true
    }
  }
})

module.exports = Photo
