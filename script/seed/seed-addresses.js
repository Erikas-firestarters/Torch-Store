const faker = require('faker');
const Promise = require('bluebird');
const db = require('../../server/db');
const { Address } = require('../../server/db/models');

const numAddresses = 50;

function doTimes(n, fn) {
  const results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

function randAddress() {
  const address = {
    fullName: faker.name.findName(),
    addressLine1: faker.address.streetAddress(),
    addressLine2: `${faker.address.county()} County`,
    city: faker.address.city(),
    state: faker.address.state(),
    zipcode: faker.address.zipCode().slice(0, 5),
    phone: faker.phone.phoneNumberFormat(),
  };
  return Address.build(address);
}

function generateAddress() {
  const addresses = doTimes(numAddresses, randAddress);
  return addresses;
}

function createAddress() {
  return Promise.map(generateAddress(), address => address.save());
}

function seed() {
  return createAddress();
}

db
  .sync({ force: false })
  .then(() => {
    console.log('Seeding database');
    return seed();
  })
  .then(() => console.log('Seeding successful'))
  .catch(err => {
    console.error('Error while seeding');
    console.error(err.stack);
  })
  .finally(() => {
    db.close();
    return null;
  });
