/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const Review = db.model('review')


describe('Product routes', () => {
  beforeEach(async () => {
    await db.sync({force: true})
  })
  describe('/api/products/', () => {
    const newProduct = {
      name: 'El Flamo',
      description: 'hotter than hell, (batteries not included)',
      price: 40.44,
      inventory: 20,
    }

    const newReview = {
      title: 'ronnies review',
      content: 'bet flamin torfth EVAR!',
      rating: 5,
      productId: 1
    }

    beforeEach( async () => {
      await Product.create(newProduct)
    })

    beforeEach(() => {
      return Review.create(newReview)
    })


    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal('El Flamo')
        })
    })

    it('GET /api/products/:id', () => {
      return request(app)
        .get('/api/products/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.name).to.be.equal('El Flamo')
        })
    })

    it('GET /api/products/:id/review', () => {
      return request(app)
        .get('/api/products/1/reviews')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].title).to.be.equal('ronnies review')
        })
    })

    it('POST /api/products/:id/review', () => {
      return request(app)
        .post('/api/products/1/reviews')
        .send({
          title: 'decent torch for punks',
          content: 'catches on fire consistently'
        })
        .expect(200)
        .then(function () {
          return Review.findOne({
            where: { title: 'decent torch for punks' }
          });
        })
        .then(function (foundReview) {
          expect(foundReview).to.exist; // eslint-disable-line no-unused-expressions
          expect(foundReview.content).to.equal('catches on fire consistently');
        });
    })
  })



})
