const faker = require('faker');

// const toonAvatar = require('cartoon-avatar');
const Promise = require('bluebird');
const db = require('../../server/db');
const { User } = require('../../server/db/models');

const numUsers = 50;

function doTimes(n, fn) {
  const results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

function randUser() {
  const user = {
    password: '123',
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    isAdmin: false,
  };
  user.email = `${user.firstName}.${user.lastName}@${faker.internet.domainName()}`;
  return User.build(user);
}

function generateUsers() {
  const users = doTimes(numUsers, randUser);
  users.push(
    User.build({
      firstName: 'Daniel',
      lastName: 'Simandl',
      email: `daniel.simandl@${faker.internet.domainName()}`,
      password: '123',
      isAdmin: true,
    })
  );
  users.push(
    User.build({
      firstName: 'Sam',
      lastName: 'Kogan',
      email: `sam.kogan@${faker.internet.domainName()}`,
      password: '123',
      isAdmin: true,
    })
  );
  users.push(
    User.build({
      firstName: 'Caitlin',
      lastName: 'Trussell',
      email: `caitlin.trussell@${faker.internet.domainName()}`,
      password: '123',
      isAdmin: true,
    })
  );
  users.push(
    User.build({
      firstName: 'Josh',
      lastName: 'Remaley',
      email: `josh.remaley@${faker.internet.domainName()}`,
      password: '123',
      isAdmin: true,
    })
  );
  users.push(
    User.build({
      firstName: 'Erika',
      lastName: 'Weil',
      email: `erika.weil@${faker.internet.domainName()}`,
      password: '123',
      isAdmin: true,
    })
  );

  return users;
}

function createUsers() {
  return Promise.map(generateUsers(), users => users.save());
}

function seed() {
  console.log('Syncing users');
  return createUsers();
}

module.exports = seed
