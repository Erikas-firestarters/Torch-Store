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

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email'],
  })
    .then(users => res.json(users))
    .catch(next);
});
router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.json(user))
    .catch(next);
});

router.get('/:id/orders', (req, res, next) => {
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

router.get('/:id/orders/:orderId', (req, res, next) => {
  Order.findAll({
    where: { id: req.params.orderId },
    include: [{ model: OrderItem, include: [Product] }],
  })
    .then(orders => {
      res.json(orders);
    })
    .catch(next);
});

router.get('/:id/cart', (req, res, next) => {
  const { id } = req.requestedUser;
  Cart.findOne({
    where: { userId: id },
    include: [{ model: CartItem, include: [Product] }],
  })
    .then(cart => res.json(cart))
    .catch(next);
});
router.post('/:id/cart', (req, res, next) => {
  Cart.build(req.body)
    .then(cart => cart.setUser(req.requestedUser))
    .save()
    .then(cart => res.json(cart))
    .catch(next);
});
router.delete('/:id/cart', (req, res, next) => {
  const { id } = req.requestedUser;
  Cart.findOne({ where: { userId: id } })
    .then(() => res.sendStatus(204))
    .catch(next);
});
router.get('/:id', (req, res, next) => {
  req.requestedUser
    .reload(User.options.scopes.safeUser())
    .then(requestedUser => {
      res.json(requestedUser);
    })
    .catch(next);
});
router.put('/:id', (req, res, next) => {
  req.requestedUser
    .update(req.body)
    .then(updatedUser => res.json(updatedUser))
    .catch(next);
});
router.delete('/:id', (req, res, next) => {
  req.requestedUser
    .destroy()
    .then(() => res.status(204))
    .catch(next);
});
