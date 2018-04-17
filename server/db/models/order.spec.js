/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('total calculation getter', () => {

    it('should return correct subtotal + tax', async () => {
        const order = await Order.build({
          status: 'Processing',
          subtotal: 12.95,
          tax: 1.15
        })
        const total = order.subtotal + order.tax
        expect(order.total).to.equal(total)
    })
  }) // end describe('getter')
}) // end describe('User model')
