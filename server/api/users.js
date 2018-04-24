const router = require('express').Router();
const {
  User,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Product,
} = require('../db/models');
const HttpError = require('../utils/HttpError');
const {selfOrAdmin, adminsOnly} = require('../utils/gatekeeper');
module.exports = router;

router.param('id', (req, res, next, id) => {
  User.findById(id)
    .then(user => {
      if (!user) throw new HttpError(404);
      req.requestedUser = user;
      next();
    })
    .catch(next);
});

router.get('/:id/orders', selfOrAdmin, (req, res, next) => {
  const { id } = req.requestedUser;
  Order.findAll({
    where: { userId: id },
    include: [{ model: OrderItem, include: [Product] }],
  })
    .then(orders => {
      res.json(orders);
    })
    .catch(next);
});

router.get('/:id/orders/:orderId', selfOrAdmin, (req, res, next) => {
  Order.findAll({
    where: { id: req.params.orderId },
    include: [{ model: OrderItem, include: [Product] }],
  })
    .then(orders => {
      res.json(orders);
    })
    .catch(next);
});

router.put('/:id', adminsOnly, (req, res, next) => {
  req.requestedUser
    .update(req.body)
    .then(updatedUser => res.json(updatedUser))
    .catch(next);
});

router.delete('/:id', adminsOnly, (req, res, next) => {
  req.requestedUser
    .destroy()
    .then(() => res.sendStatus(204))
    .catch(next);
});
