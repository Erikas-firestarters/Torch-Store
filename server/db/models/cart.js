const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  placeholder: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

module.exports = Cart
