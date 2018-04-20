const router = require('express').Router();
const { CartItem, Product } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  console.log('req', req.session);
  const id = 1; ///////update this with session USERID
  CartItem.findAll({
    where: { userId: id },
    include: [Product]
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
