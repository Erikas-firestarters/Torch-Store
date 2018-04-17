const User = require('./user')
const CartItem = require('./cartItem')
const Cart = require('./cart')
const Product = require('./product')
const Address = require('./address')
const Order = require('./order');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Cart.belongsTo(User)
CartItem.belongsTo(Cart)


User.hasOne(Cart)
Cart.hasMany(CartItem, {
  onDelete: 'cascade',
  hooks: true
})
Product.hasOne(CartItem)

Address.hasOne(Order, {as: 'billing'}) // billingID on orders model
Address.hasOne(Order, {as: 'shipping'})
User.hasOne(Order)

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
}
