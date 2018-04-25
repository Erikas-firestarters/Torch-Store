const router = require('express').Router();
const { User, Order, OrderItem, Address } = require('../db/models');
const HttpError = require('../utils/HttpError');
const nodemailer = require('nodemailer');
process.env.EMAIL_USER = 'firestartersgroupemail@gmail.com';
process.env.EMAIL_PASS = '666Password';
var transporter = nodemailer.createTransport(
  `smtps://${process.env.EMAIL_USER}:${process.env.EMAIL_PASS}@smtp.gmail.com`
);

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

  let message = {
    to: user.email,
    subject: 'Torch Order Confirmation',
    text:
      'We know you have a choice when it comes to buying torches and torch accessories, and we want to thank you for choosing our store. We hope your torch experience was firey. Please torch with us again soon.',
  };

  let sentMessage = {
    to: user.email,
    subject: 'Torch Order Shipped!',
    text:
      'Your order is on its way, please be careful while torching. Always torch responsibly.',
  };

  transporter.sendMail(message, function(error, info) {
    if (error) return console.log(error)
      console.log('Message sent: ' + info.response)});

  setTimeout(transporter.sendMail(sentMessage, function(error, info) {
      if (error) return console.log(error);
      console.log('Message sent: ' + info.response)}), 20000);

  Promise.all(orderItems).then(res.sendStatus(201));
});
