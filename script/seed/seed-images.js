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

const randomImage = () => {
  const image = {
    imageUrl: faker.image.imageURL,
    productId: 1
  }
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
  console.log('working photo seed')
  return createImages();
}

seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })
