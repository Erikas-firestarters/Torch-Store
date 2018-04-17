const User = require('./user')
const CartItem = require('./cartItem')
const Cart = require('./cart')
const Product = require('./product')
const Address = require('./address')
const Photo = require('./photo')
const Review = require('./review')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Cart.belongsTo(User)
CartItem.belongsTo(Cart)
Product.belongsTo(CartItem)
Photo.belongsTo(Product)

User.hasOne(Cart)
Cart.hasMany(CartItem, {
  onDelete: 'cascade',
  hooks: true
})
Product.hasMany(Photo)
CartItem.hasOne(Product)

Review.belongsTo(Product)
Review.belongsTo(User)

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
  Photo,
  Review,
}
