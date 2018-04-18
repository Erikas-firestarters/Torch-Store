const faker = require('faker');
const Promise = require('bluebird');
const db = require('../../server/db');
const { Product } = require('../../server/db/models');

const numProducts = 50;

function doTimes(n, fn) {
  const results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

function randProduct() {
  const product = {
    name: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
    price: faker.commerce.price(),
    inventory: faker.random.number(),
  };
  return Product.build(product);
}

function generateProducts() {
  const products = doTimes(numProducts, randProduct);
  return products;
}

function createProducts() {
  return Promise.map(generateProducts(), users => users.save());
}

function seed() {
  return createProducts();
}

db
  .sync({ force: true })
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
