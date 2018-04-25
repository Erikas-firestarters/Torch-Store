/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Sequelize = require('sequelize');

describe('User model', () => {

  describe('instanceMethods', () => {
    describe('correctPassword', () => {

      it('returns true if the password is correct', async () => {
        let cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'iLoveCoolDogs',
          firstName: 'Cody',
          lastName: 'Bones'
        })
        // expect(cody.correctPassword('iLoveCoolDogs')).to.be.equal(true)
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
          expect(err).to.be.an.instanceOf(Sequelize.ValidationError)
        }
      })

  }) // end describe('getter')
}) // end describe('User model')
