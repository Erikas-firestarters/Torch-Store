const chance = require('chance')(123);
const { Review } = require('../../server/db/models')
const db = require('../../server/db')
const Promise = require('bluebird');

const numReviews = 10;

const titles = [
  'Best Torch in the business',
  'Firetastic',
  'This thing is firey',
  'Bring the heat',
  'Set my world on fire'
]

const content = [
  'This baby glows like the sun, no regrets',
  'The tiki torches were the life of my tiki party, everyone was impressed. Only had one torch explode unexpectedly, subtracted 1 star.',
  'HOLY CRAP ITS HOT',
  'Was able to melt tungsten',
  'Performs as advertised, the torch was able to cure all my diseases!',
  '10/10fastshipper would do business again!'
]

function doTimes (n, fn) {
  const results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

function randReview () {
  return Review.build({
    title: randTitle(),
    content: randContent(),
    rating: chance.integer({min: 0, max: 5})
  });
}

function randTitle () {
  return chance.pick(titles)
}

function randContent () {
  return chance.pick(content)
}

function generateReviews () {
  const reviews = doTimes(numReviews, randReview);
  reviews.push(Review.build({
    title: 'Meh',
    content: 'Torch was meh, wouldnt buy again',
    rating: 0
  }));
  return reviews;
}

function createReviews() {
  return Promise.map(generateReviews(), review => review.save());
}

function seed () {
  return createReviews()
}

console.log('Syncing reviews');

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
module.exports = seed
