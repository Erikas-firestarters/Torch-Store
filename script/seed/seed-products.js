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
  return Promise.map(generateProducts(), products => products.save());
}

const catPairs = [ [1, 4], [2, 6], [3, 5], [2, 5], [1, 6], [9, 8], [10, 3], [7, 4], [8, 3]]
const randomCategory = () => Math.floor(Math.random() * catPairs.length);

const setCategories = (productsArr) => {
  for (let product of productsArr) {
    let randomCat = catPairs[randomCategory()];
    product.setCategories(randomCat[0])
    product.setCategories(randomCat[1])
  }
}
const seedProducts = async () => {
  try {
    let products = await createProducts();
    return setCategories(products);
  }
  catch (err) {
    console.error(err);
  }

}

function seed() {
  console.log('Syncing products');
  return seedProducts();
}

module.exports = seed;
