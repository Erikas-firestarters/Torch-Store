const { expect } = require('chai')
const db = require('../index')
const Address = db.model('address')

describe('Address model', () => {

  beforeEach(() => {
    return db.sync({ force: true })
  })

  var address
  beforeEach(() => {
    address = Address.build({
      fullName: 'Torchy McFire',
      addressLine1: '123 Fake Street',
      addressLine2: 'Apt 90000',
      city: 'Riotville',
      state: 'IL',
      zipcode: 60001,
      phone: '123-456-7890'
    });
  })

  afterEach(function () {
    return Promise.all([
      Address.truncate({ cascade: true }),
    ]);
  });

  describe('definition', () => {

    it('has expected all expected fields fullName, addressLine1, addressLine2, city, state, zipcode, and phone', () => {
      return address.save()
        .then((savedAddress) => {
          expect(savedAddress.addressLine1).to.equal('123 Fake Street')
          expect(savedAddress.addressLine2).to.equal('Apt 90000')
          expect(savedAddress.city).to.equal('Riotville')
          expect(savedAddress.state).to.equal('IL')
          expect(savedAddress.zipcode).to.equal(60001)
          expect(savedAddress.phone).to.equal('123-456-7890')
          expect(savedAddress.fullName).to.equal('Torchy McFire')
        })
    });

    it('requires fullName, addressLine1, city, state, zipcode, and phone', () => {

      address.phone = null;
      address.addressLine2 = null;

      return address.save()
        .then((savedAddress) => {
          expect(savedAddress.addressLine1).to.equal('123 Fake Street')
          expect(savedAddress.city).to.equal('Riotville')
          expect(savedAddress.state).to.equal('IL')
          expect(savedAddress.zipcode).to.equal(60001)
          expect(savedAddress.fullName).to.equal('Torchy McFire')
        })
    });
  })
})
