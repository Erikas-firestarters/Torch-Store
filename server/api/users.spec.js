/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Cart = db.model('cart');
const CartItem = db.model('cartItem');
const Product = db.model('product');

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  const user = {
    email: 'cody@puppybook.com',
    password: 'bones',
    firstName: 'Cody',
    lastName: 'Bones'
  };
  const cart = { quantity: 1 };
  const cartItem = { quantity: 1 };
  const product = {
    name: 'El Flamo',
    description: 'hotter than hell, (batteries not included)',
    price: 40.44,
    inventory: 20
  }


  describe('/api/users/', () => {
    beforeEach(() => {
      return User.create(user)
    })

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(({body}) => {
          expect(body).to.be.an('array')
          expect(body[0].email).to.be.equal('cody@puppybook.com')
      })
    })
  })
  describe('/api/users/:id', () => {
    beforeEach(async () => {
      await User.create(user)
    })

    it('GET /api/users/1', () => {
      return request(app)
        .get('/api/users/1')
        .expect(200)
        .then(({body}) => {
          expect(body).to.be.an('object')
          expect(body.email).to.be.equal('cody@puppybook.com')
      })
    })

    it('DELETE /api/users/1/', (done) => {
      return request(app)
        .del('/api/users/1')
        .expect(204)
        .end(done());
    })
  })

  describe('/api/users/:id/cart', () => {

    beforeEach( async () => {
      const newUser = await User.create(user);
      const newProduct = await Product.create(product);
      const newCart = await Cart.create(cart);
      const newCartItem = await CartItem.create(cartItem);
      newCartItem.setProduct(newProduct)
      newCartItem.setCart(newCart);
      newCart.setUser(newUser);
    })

    it('GET /api/users/:id/cart', () => {
      return request(app)
        .get('/api/users/1/cart')
        .expect(200)
        .then( ({body}) => {
          expect(body).to.be.an('object');
          expect(body.cartItems).to.be.an('array');
        })
    })
    it('DELETE /api/users/:id/cart', (done) => {
      return request(app)
      .del('/api/users/1/cart')
      .expect(204)
      .end(done());
    })
  })
}) // end describe('User routes')
