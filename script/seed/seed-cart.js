const db = require('../../server/db');
const { Cart, CartItem } = require('../../server/db/models');

const cart = [
  {
    userId: 1
  },
  {
    userId: 2
  },
  {
    userId: 3
  },
  {
    userId: 4
  },
  {
    userId: 5
  },
  {
    userId: 6
  },
  {
    userId: 7
  }
];

const cartItems = [
  {
    quantity: 1,
    userId: 1,
    productId: 3
  },
  {
    quantity: 2,
    userId: 1,
    productId: 2
  },
  {
    quantity: 2,
    userId: 1,
    productId: 1
  },
  {
    quantity: 1,
    userId: 2,
    productId: 2
  },
  {
    quantity: 2,
    userId: 2,
    productId: 1
  },
  {
    quantity: 3,
    userId: 2,
    productId: 3
  },
  {
    quantity: 1,
    userId: 3,
    productId: 3
  },
  {
    quantity: 3,
    userId: 3,
    productId: 4
  },
  {
    quantity: 1,
    userId: 3,
    productId: 3
  },
  {
    quantity: 1,
    userId: 4,
    productId: 3
  },
  {
    quantity: 3,
    userId: 4,
    productId: 4
  },
  {
    quantity: 1,
    userId: 4,
    productId: 3
  }
];


const seed = () => {
  console.log('Syncing carts')
  return Promise.all(cart.map(carts => Cart.create(carts)))
  .then(() => Promise.all(cartItems.map(items => CartItem.create(items))))
  .catch(error => console.error(error))
}

module.exports = seed
// const mainSync = () => {
//   db
//     .sync({ force: false })
//     .then(() => {
//       console.log('Seeding database');
//       return seed();
//     })
//     .then(() => console.log('Seeding successful'))
//     .catch(err => {
//       console.error('Error while seeding');
//       console.error(err.stack);
//     })
//     .finally(() => {
//       db.close();
//       return null;
//     });
// };

// mainSync();
