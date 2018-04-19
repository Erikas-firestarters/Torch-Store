const faker = require('faker');
const chance = require('chance')(123);
const Promise = require('bluebird');
const db = require('../../server/db');
const { Order, OrderItem } = require('../../server/db/models');

const numOrders = 50;
const numProducts = 50;
const numOrderItems = 200;
const numUsers = 50;
const numAddresses = 50;

function doTimes(n, fn) {
  const results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

function randOrder() {
  const order = {
    status: chance.pick(['Created', 'Processing', 'Cancelled', 'Completed']),
    subtotal: faker.commerce.price(),
    userId: chance.integer({ min: 1, max: numUsers }),
    billingId: chance.integer({ min: 1, max: numAddresses }),
    shippingId: chance.integer({ min: 1, max: numAddresses }),
  };
  order.tax = order.subtotal * 0.09;
  return Order.build(order);
}
function randOrderItem(createdOrders) {
  const order = chance.pick(createdOrders);
  const orderItem = {
    status: chance.pick(['Created', 'Processing', 'Cancelled', 'Completed']),
    subtotal: faker.commerce.price(),
    orderId: order.id,
    productId: chance.integer({ min: 1, max: numProducts }),
    price: faker.commerce.price(),
  };
  order.tax = order.subtotal * 0.09;
  return OrderItem.build(orderItem);
}

function generateOrderItems(createdOrders) {
  const orderItems = doTimes(numOrderItems, () => randOrderItem(createdOrders));
  return orderItems;
}
function generateOrders() {
  return doTimes(numOrders, randOrder);
}

function createOrders() {
  return Promise.map(generateOrders(), orders => orders.save());
}
function createOrderItems(createdOrders) {
  return Promise.map(generateOrderItems(createdOrders), orderItems =>
    orderItems.save()
  );
}

function seed() {
  console.log('Syncing orders and orderItems');
  return createOrders().then(createdOrders => createOrderItems(createdOrders));
}

module.exports = seed;
