const User = require('./user');
const CartItem = require('./cartItem');
const Cart = require('./cart');
const Product = require('./product');
const Address = require('./address');
const Order = require('./order');
const OrderItem = require('./orderItem');
const Category = require('./category');
const Photo = require('./photo');
const Review = require('./review');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
CartItem.belongsTo(User);

Photo.belongsTo(Product);

User.hasOne(Cart);
User.hasMany(CartItem, {
  onDelete: 'cascade',
  hooks: true,
});

Product.hasMany(Photo);

User.hasMany(Order);
OrderItem.belongsTo(Order);

Order.hasMany(OrderItem, {
  onDelete: 'cascade',
  hooks: true,
});

Product.belongsTo(Category);

OrderItem.belongsTo(Product);
CartItem.belongsTo(Product);

Review.belongsTo(Product);
Review.belongsTo(User);

Order.belongsTo(Address, { as: 'billing' }); // billingID on orders model
Order.belongsTo(Address, { as: 'shipping' });

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Cart,
  CartItem,
  Product,
  Address,
  Order,
  OrderItem,
  Category,
  Photo,
  Review,
};
