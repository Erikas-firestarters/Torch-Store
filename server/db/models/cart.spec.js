const Promise = require('bluebird');
const { expect } = require('chai');
const db = require('../index');
const Cart = db.model('cart');
const CartItem = db.model('cartItem');

describe('Cart model', () => {
  beforeEach(() => {
    return db.sync({
      force: true
    });
  });

  describe('cart association', () => {
    it('does association right for carts', async () => {
      try {
        let createdCart = await Cart.create({
          quantity: '1'
        });
        let createdCartItem = await CartItem.create({
          quantity: 2
        });
        createdCartItem.setCart(createdCart);
        expect(createdCartItem.cartId).to.equal(1);
      } catch (error) {
        console.error(error);
      }
    });
  });
});
