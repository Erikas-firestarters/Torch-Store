const router = require('express').Router();
const {
  User,
  Order,
  OrderItem,
  Address
} = require('../db/models');
const HttpError = require('../utils/HttpError');
module.exports = router;

router.post('/', async (req, res, next) => {

  // const order = await Order.create({
  //   userId: req.body.userId,
  //   status: 'Created',
  //   subtotal: req.body.subtotal,
  //   tax: req.body.tax,
  //   billingId: req.body.billingId,
  //   shippingId: req.body.shippingId,
  // })

  // const billing = await Address.create({
  //   fullName: req.body.billing.fullName,
  //   addressLine1: req.body.billing.addressLine1,
  //   addressLine2: req.body.billing.addressLine2,
  //   city: req.body.billing.city,
  //   state: req.body.billing.state,
  //   zipcode: req.body.billing.zipcode,
  //   phone: req.body.billing.phone,
  // })

  // const shipping = await Address.create({
  //   fullName: req.body.shipping.fullName,
  //   addressLine1: req.body.shipping.addressLine1,
  //   addressLine2: req.body.shipping.addressLine2,
  //   city: req.body.shipping.city,
  //   state: req.body.shipping.state,
  //   zipcode: req.body.shipping.zipcode,
  //   phone: req.body.shipping.phone,
  // }

  const billing = await Address.create(req.body.address.shipping)
  const shipping = await Address.create(req.body.address.billing)
  const user = await User.findById(req.body.address.cart[1].id)

  const order = await Order.create({
    status: 'created',
    shippingId: shipping,
    billingId: billing,
    userId: user,
  })

  const orderObjectArray = await req.body.address.cart.map(items => {
    OrderItem.Create({
      productId: items.id,
      quantity: items.quantity,
      price: items.price,
    })
  }).then((thisOrder) => {
    thisOrder.setOrder(order)
  })
}).catch(HttpError);
