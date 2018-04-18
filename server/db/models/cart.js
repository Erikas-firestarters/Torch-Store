const Sequelize = require('sequelize');
const db = require('../db');
const CartItem = db.model('cartItem');

const Cart = db.define('cart', {
  quantity: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 0
  }
});

module.exports = Cart;

Cart.prototype.cartQuantity = () => {
  return CartItem.findAll({
    where: {
      cartId: this.id
    }
  });
};
