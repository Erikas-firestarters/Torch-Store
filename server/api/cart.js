const router = require('express').Router();
const { CartItem, Product } = require('../db/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = router;

router.get('/', (req, res, next) => {
  CartItem.findAll({
    where: { userId: req.session.passport.user },
    include: [Product],
  })
    .then(cartItems =>
      cartItems.map(cartItem => {
        const sendItem = cartItem.product;
        sendItem.dataValues.quantity = cartItem.quantity;
        sendItem.dataValues.cartItemId = cartItem.id;
        return sendItem;
      })
    )
    .then(cart => res.json(cart))
    .catch(next);
});
router.delete('/', (req, res, next) => {
  req.body.userId = req.session.passport.user;
  const {userId, productId} = req.body;
  // const productId = req.body
  console.log('userId:', userId, 'prodid', req.body )

  CartItem.findAll({
    where: {
      [Op.and]: [
        { userId: userId },
        { productId: productId },
      ],
    },
  })
    .then(items => console.log('found items', items))
    .then(() => res.sendStatus(202))
    // .then(cartItem => cartItem.destroy())
    // .then(updatedCartItem => res.json(updatedCartItem))
    .catch(next);
});
router.post('/', (req, res, next) => {
  req.body.userId = req.session.passport.user;
  CartItem.create(req.body)
    .then(newCartItem => res.json(newCartItem))
    .catch(next);
});

router.put('/', (req, res, next) => {
  req.body.userId = req.session.passport.user;
  CartItem.findById(req.body.id)
    .then(result => result.update(req.body))
    .then(updatedCartItem => res.json(updatedCartItem))
    .catch(next);
});
