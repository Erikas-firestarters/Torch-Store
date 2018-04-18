const Sequelize = require('sequelize');
const db = require('../db');
const CartItem = db.model('cartItem');

const Cart = db.define('cart', {
  quatity: {
    type: Sequelize.VIRTUAL,
    get: function () {
      return CartItem.findAll({
        where: {
          cartId: this.id
        }
      }).then(items => items.length)
     }
  }
});

module.exports = Cart;
