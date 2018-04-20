const router = require('express').Router();
const { CartItem, Product } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  CartItem.findAll({
    where: { userId: req.session.passport.user },
    include: [Product],
  })
    .then(res =>
      res.map(cartItem => {
        const sendItem = cartItem.product;
        sendItem.dataValues.quantity = cartItem.quantity;
        return sendItem;
      })
    )
    .then(cart => res.json(cart))
    .catch(next);
});
router.delete('/', (req, res, next) => {
  if (req.deletedCartItem.userId === req.session.passport.user) {
    CartItem.findById({ where: { id: req.body.cartItem.id } })
      .destroy()
      .then(() => res.status(204))
      .catch(next);
  } else {
    res.status(401);
  }
});
router.post('/', (req, res, next) => {
  if (req.deletedCartItem.userId === req.session.passport.user) {
    CartItem.create(req.body)
      .then(newCartItem => res.json(newCartItem))
      .catch(next);
  } else {
    res.status(401);
  }
});
router.put('/', (req, res, next) => {
  if (req.deletedCartItem.userId === req.session.passport.user) {
    CartItem.findById({ where: { id: req.body.cartItem.id } })
      .update(req.body)
      .then(updatedCartItem => res.json(updatedCartItem))
      .catch(next);
  } else {
    res.status(401);
  }
});
