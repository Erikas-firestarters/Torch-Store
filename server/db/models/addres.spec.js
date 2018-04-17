const { expect } = require('chai')
const db = require('../index')
const Address = db.model('address')



describe('Address model', () => {

    beforeEach(() => {
        return db.sync({ force: true })
    })

    describe('definition', () => {
        it('has expected fullName definition', () => {
            expect(Address.attributes.fullName).to.be.an('object');
        });

        it('has expected addressLine1 definition', () => {
            expect(Address.attributes.addressLine1).to.be.an('object');
        });

        it('has expected addressLine2 definition', () => {
            expect(Address.attributes.addressLine2).to.be.an('object');
        });

        it('has expected city definition', () => {
            expect(Address.attributes.city).to.be.an('object');
        });

        it('has expected state definition', () => {
            expect(Address.attributes.state).to.be.an('object');
        });

        it('has expected zipcode definition', () => {
            expect(Address.attributes.zipcode).to.be.an('object');
        });

        it('has expected phone definition', () => {
            expect(Address.attributes.phone).to.be.an('object');
        });
    })

    describe('requires all fields except for addressLine2 and phone', () => {
        it('addressLine2 field', () => {
            expect(Address.attributes.addressLine2).to.be.an('object');
        });
    })

})
