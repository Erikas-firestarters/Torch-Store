const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  placeholder: {
    allowNull: true
  }
})

module.exports = Cart
