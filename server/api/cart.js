const router = require('express').Router();
const { CartItem } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  console.log('req', req);
  const { id } = req.requestedUser;
  CartItem.findAll({
    where: { userId: id },
    //include: [{ model: CartItem, include: [Product] }],
  })
    .then(cart => res.json(cart))
    .catch(next);
});
router.delete('/', (req, res, next) => {
  CartItem.build(req.body)
    .then(cart => cart.setUser(req.requestedUser))
    .save()
    .then(cart => res.json(cart))
    .catch(next);
});
router.post('/', (req, res, next) => {
  const { id } = req.requestedUser;
  CartItem.findOne({ where: { userId: id } })
    .then(() => res.sendStatus(204))
    .catch(next);
});
router.put('/', (req, res, next) => {
  const { id } = req.requestedUser;
  CartItem.findOne({ where: { userId: id } })
    .then(() => res.sendStatus(204))
    .catch(next);
});
