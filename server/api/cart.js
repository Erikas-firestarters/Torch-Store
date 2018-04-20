const router = require('express').Router();
const { CartItem, Product } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  console.log('req', req.session);
  const id = 1; ///////update this with session USERID
  CartItem.findAll({
    where: { userId: id },
    include: [Product],
  })
    .then(cart => res.json(cart))
    .catch(next);
});
router.delete('/', (req, res, next) => {
  if (req.deletedCartItem.userId === req.session.userId) {
    CartItem.findById({ where: {id: req.body.cartItem.id}})
      .destroy()
      .then(() => res.status(204))
      .catch(next);
  } else {
    res.status(401);
  }
});
router.post('/', (req, res, next) => {
  if (req.deletedCartItem.userId === req.session.userId) {
    CartItem.create(req.body)
      .then((newCartItem) => res.json(newCartItem))
      .catch(next);
  } else {
    res.status(401);
  }
});
router.put('/', (req, res, next) => {
  if (req.deletedCartItem.userId === req.session.userId) {
    CartItem.findById({ where: {id: req.body.cartItem.id}})
      .update(req.body)
      .then((updatedCartItem) => res.json(updatedCartItem))
      .catch(next);
  } else {
    res.status(401);
  }
});
