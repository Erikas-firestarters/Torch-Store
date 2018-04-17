const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('pending', 'complete'),
  },
  subtotal: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  tax: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0,
  },
  total: {
    type: Sequelize.VIRTUAL,
    get() {
      return this.getDataValue('tax') + this.getDataValue('subtitle');
    },
  }
})

module.exports = Order;

// ASSOCIATIONS HASONE _ __ userID, shippingAddress billingaddress
