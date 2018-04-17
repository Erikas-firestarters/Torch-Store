const {expect} = require('chai')
const db = require('../index')
const Cart = db.model('cart')
const CartItem = db.model('cartItem')


describe('Cart model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('cart association', () => {
    let createCart = Cart.create({quatntity: '0'});
    let createCartItem = CartItem.create({quantity: 2})

    return Promise.all([createCart, createCartItem])
    .spread((createdCart, createdCartItem) => {
      return createdCartItem.setCart(createdCart);
    })
    .then(() => {
      return CartItem.findOne({
        where: {
          id: 1
        }
      })
    })
    .then(foundCartItem => {
      expect(foundCartItem.cartId).to.exist;
    });
})
})
