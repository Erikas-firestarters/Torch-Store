const Sequelize = require('sequelize');
const db = require('../db');
const CartItem = db.model('cartItem');

const Cart = db.define('cart', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
  // quantity: {
  //   type: Sequelize.VIRTUAL,
  //   get: function () {
  //     return CartItem.findAll({
  //       where: {
  //         cartId: this.id
  //       }
  //     }).then(items => {
  //       console.log('setting quantity for cart')
  //       return items.length
  //     })
  //    }
  // }
});

module.exports = Cart;
