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
//deletes ALL cart items for the current user
router.delete('/', (req, res, next) => {
  const userId = req.session.passport.user;
  CartItem.destroy({
    where: { userId: userId },
  })
    .then(() => res.sendStatus(204))
    .catch(next);
});

router.delete('/:cartItemId', (req, res, next) => {
  req.body.userId = req.session.passport.user;
  const { userId } = req.body;
  const { cartItemId } = req.params;
  CartItem.destroy({
    where: {
      [Op.and]: [{ userId: userId }, { id: cartItemId }],
    },
  })
    .then(() => res.sendStatus(204))
    .catch(next);
});
router.post('/', (req, res, next) => {
  req.body.userId = req.session.passport.user;
  CartItem.create(req.body)
    .then(newCartItem => res.json(newCartItem))
    .catch(next);
});

router.post('/transfer', (req, res, next) => {
  req.body.forEach(element => {
    element.userId = req.session.passport.user
    return element
  });
  CartItem.bulkCreate(req.body, { individualHooks: true})
    .then(newCart => {
      return res.json(newCart)
    })
    .catch(next);
});

router.put('/', (req, res, next) => {
  req.body.userId = req.session.passport.user;
  CartItem.findById(req.body.id)
    .then(result => result.update(req.body))
    .then(updatedCartItem => res.json(updatedCartItem))
    .catch(next);
});
