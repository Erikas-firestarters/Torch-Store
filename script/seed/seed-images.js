const faker = require('faker');
const Promise = require('bluebird');
const db = require('../../server/db');
const {
  Photo
} = require('../../server/db/models');

const quantImage = 50;

function doTimes(n, fn) {
  const results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}
let counter = 1;

const randomImage = () => {
  const image = {
    imageUrl: faker.image.imageURL,
    productId: counter,
  }
  counter++;
  return Photo.build(image);
}

function generateImages() {
  const images = doTimes(quantImage, randomImage);
  return images;
}

function createImages() {
  return Promise.map(generateImages(), image => image.save());
}

function seed() {
  console.log('Syncing photos')
  return createImages();
}

module.exports = seed;
