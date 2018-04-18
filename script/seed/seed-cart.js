const db = require('../../server/db');
const { Cart, CartItem } = require('../../server/db/models');

const cartItems = [
  {
    quantity: 1,
    cartId: 1,
    productId: 3
  },
  {
    quantity: 2,
    cartId: 1,
    productId: 2
  },
  {
    quantity: 2,
    cartId: 1,
    productId: 1
  },
  {
    quantity: 1,
    cartId: 2,
    productId: 2
  },
  {
    quantity: 2,
    cartId: 2,
    productId: 1
  },
  {
    quantity: 3,
    cartId: 2,
    productId: 3
  },
  {
    quantity: 1,
    cartId: 3,
    productId: 3
  },
  {
    quantity: 3,
    cartId: 3,
    productId: 4
  },
  {
    quantity: 1,
    cartId: 3,
    productId: 3
  },
  {
    quantity: 1,
    cartId: 4,
    productId: 3
  },
  {
    quantity: 3,
    cartId: 4,
    productId: 4
  },
  {
    quantity: 1,
    cartId: 4,
    productId: 3
  }
];

const cart = [
  {
    userId: 1
  },
  {
    userId: 2
  },
  // {
  //   userId: 3
  // },
  // {
  //   userId: 4
  // },
  // {
  //   userId: 5
  // },
  // {
  //   userId: 6
  // },
  // {
  //   userId: 7
  // }
];

const seed = () =>
  Promise.all(cart.map(carts => Cart.create(carts)))
    .then(() => {
      Promise.all(
        cartItems.map(items => {
          return CartItem.create(items);
        })
      );
    })
    .catch(error => console.error(error));
const mainSync = () => {
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
};

mainSync();
