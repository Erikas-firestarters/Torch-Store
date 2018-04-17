/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(() => {
        return User.create({
          email: 'cody@puppybook.com',
          password: 'bones',
          firstName: 'Cody',
          lastName: 'Bones'
        })
          .then(user => {
            cody = user
          })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')

    describe('user validations', () => {
      let davey = {
        email: '123@gmail.com',
        password: '123',
        firstName: 'Davey',
        lastName: 'Bones'
      };

      it('should throw error when email field is empty', async () => {
        try {
        const user = await User.build();
        await user.validate()
        }
        catch (err) {
          expect(err).to.be.an.instanceOf(Error)
        }
      })

      it('full name getter returns correct name', async () => {
        const user = await User.create(davey);
          expect(user.fullName).to.equal('Davey Bones')
      });

  }) // end describe('getter')
}) // end describe('User model')
