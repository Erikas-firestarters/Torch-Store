 /* Is not working because of AdminOnly routing...Need guidance on how to test
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe.only('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  const user = {
    email: 'cody@puppybook.com',
    password: 'bones',
    firstName: 'Cody',
    lastName: 'Bones'
  };

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
})

*/
