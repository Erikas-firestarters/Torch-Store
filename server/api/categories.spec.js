const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Category = db.model('category');

describe('/api/categories', () => {
  const cat1 = { name: 'analog' };
  const cat2 = { name: 'gas-based' };
  const cat3 = { name: 'real-flame' };
  beforeEach( async () => {
    await Category.create(cat1);
    await Category.create(cat2);
    await Category.create(cat3);
  })

  it('GET /api/categories', () => {
    return request(app)
      .get('/api/categories')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array')
        expect(res.body[0].name).to.be.equal('analog')
      })
  })
})
