const faker = require('faker');
const Promise = require('bluebird');
const db = require('../../server/db');
const { Category } = require('../../server/db/models');

const numCategories = 10;

function doTimes(n, fn) {
  const results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

function randCategory() {
  const category = {
    name: faker.random.word()
  };
  return Category.build(category);
}

function generateCategories() {
  const categories = doTimes(numCategories, randCategory);
  return categories;
}

function createCategories() {
  return Promise.map(generateCategories(), categories => categories.save());
}

function seed() {
  console.log('Syncing products');
  return createCategories();
}

module.exports = seed;
