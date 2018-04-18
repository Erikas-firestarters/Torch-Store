const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed'),
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
      return (this.getDataValue('tax') + this.getDataValue('subtotal'));
    },
  }
})

module.exports = Order;

