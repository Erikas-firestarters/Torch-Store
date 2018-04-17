const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  quantity: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 0,
  }
})

module.exports = Cart

Cart.prototype.isEmpty = () => {
  return this.quantity === 0;
  }
