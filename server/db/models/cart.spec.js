const Promise = require('bluebird');
const { expect } = require('chai');
const db = require('../index');
const Cart = db.model('cart');
const CartItem = db.model('cartItem');

describe.only('Cart model', () => {
  beforeEach(() => {
    return db.sync({
      force: true
    });
  });

  describe('cart association', () => {
    it('does association right for carts', async () => {
      let createdCart = await Cart.create({});
      let createdCartItem = await CartItem.create({
        quantity: 2
      });
      createdCartItem.setCart(createdCart);
      expect(createdCartItem.cartId).to.equal(1);
    });
  });

  // describe('cart virtual test', () => {
  //   it('counts items', async () => {
  //     let createdCart = await Cart.create({});
  //     let createdCartItem1 = await CartItem.create(
  //       {
  //         quantity: 2
  //       }
  //     );
  //     let createdCartItem2 = await CartItem.create(
  //       {
  //         quantity: 1
  //       }
  //     );
  //     createdCartItem1.setCart(createdCart);
  //     createdCartItem2.setCart(createdCart);
  //     expect(createdCart.quantity).to.equal(3);
  //   });
  // });
});
