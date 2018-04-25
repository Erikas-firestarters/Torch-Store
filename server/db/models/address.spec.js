const { expect } = require('chai')
const db = require('../index')
const Address = db.model('address')
const Sequelize = require('sequelize');

describe('Address model', () => {
  const address = {
    fullName: 'Torchy McFire',
    addressLine1: '123 Fake Street',
    addressLine2: 'Apt 90000',
    city: 'Riotville',
    state: 'IL',
    zipcode: 60001,
    phone: '123-456-7890'
  };

  describe('definition', () => {

    it('has expected all expected fields fullName, addressLine1, addressLine2, city, state, zipcode, and phone', async () => {
        let newAddress = await Address.create(address)
        expect(newAddress.addressLine1).to.equal('123 Fake Street')
        expect(newAddress.addressLine2).to.equal('Apt 90000')
        expect(newAddress.city).to.equal('Riotville')
        expect(newAddress.state).to.equal('IL')
        expect(newAddress.zipcode).to.equal(60001)
        expect(newAddress.phone).to.equal('123-456-7890')
        expect(newAddress.fullName).to.equal('Torchy McFire')
    })

    it('expects a validation error to be thrown if lacking required fields',
      async () => {
      try {
        address.phone = null;
        address.addressLine2 = null;
        await Address.create(address);
      }
      catch (err) {
        console.log(err)
        expect(err).to.be.an.instanceOf(Sequelize.ValidationError)
      }
    });
  })
})
