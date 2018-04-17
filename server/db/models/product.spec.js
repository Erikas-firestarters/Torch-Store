/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('check product values', () => {
    let tiki;
    beforeEach( () => {
      return Product.create({
        name: 'Tiki Torch',
        description: 'TIKI Torches will brighten up the backyard party and provide proven mosquito repellency when used with TIKI Brand Bitefighter fuel. Shop our variety of metal, bamboo and glass',
        price: 52.55,
        inventory: 500,
      })
        .then(product => {
          tiki = product;
        })
    })
    it('name to equel...', () => {
      expect(tiki.name).to.equal('Tiki Torch')
    })
    it('Product description to contain...', () => {
      expect(tiki.description).to.contain('backyard party')
    })
    it('Product price to be...', () => {
      expect(tiki.price).to.equal('52.55')
    })
    it('Product inventory to be...', () => {
      expect(tiki.inventory).to.equal(500)
    })
    it('Instance method inStock returns true', () => {
      expect(tiki.inStock()).to.equal(true)
    })

  })
}) // end describe('Product model')
