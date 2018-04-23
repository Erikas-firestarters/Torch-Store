const router = require('express').Router();
const { User, Order, OrderItem, Address } = require('../db/models');
const HttpError = require('../utils/HttpError');
module.exports = router;

router.post('/', async (req, res, next) => {

  req.body.billing.zipcode = Number(req.body.billing.zipcode);
  req.body.shipping.zipcode = Number(req.body.shipping.zipcode);

  const billing = await Address.create(req.body.shipping);
  const shipping = await Address.create(req.body.billing);
  const user = await User.findById(req.body.user.id);

  const order = await Order.create({
    status: 'Created',
    shippingId: shipping.id,
    billingId: billing.id,
    userId: user ? user.id : null,
    subtotal: req.body.subtotal,
    tax: req.body.tax,
  });
  const orderItems = await req.body.cart.map(item => {
    OrderItem.create({
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
    }).then(thisOrder => {
      thisOrder.setOrder(order).catch(HttpError);
    });
  });

  Promise.all(orderItems).then(res.sendStatus(201));
});
