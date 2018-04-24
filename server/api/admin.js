const router = require('express').Router();
const { User, Order, OrderItems } = require('../db/models');
const HttpError = require('../utils/HttpError');
const {adminsOnly} = require('../utils/gatekeeper');
module.exports = router;

router.get('/', adminsOnly, (req, res, next) => {
  User.findAll({
  })
    .then(users => res.json(users))
    .catch(next);
});

router.get('/orders', adminsOnly, (req, res, next) => {
  Order.findAll({
    // include: [{
    //   model: OrderItems,
    //   as: 'orderItems',
    //   required: true,
    //   through: { attributes: [] },
    // }],
  })
  .then(orders => res.json(orders))
  .catch(next)

})

router.put('/orders/:orderId', adminsOnly, (req, res, next) => {
  Order.findById(req.params.orderId)
  .update(req.body)
  .then(order => res.json(order))
  .catch(next)
})

router.delete('/orders/:orderId', adminsOnly, (req, res, next) => {
  Order.destroy({
    where: {
      id: req.params.orderId
    }
  })
  .then(() => res.sendStatus(204))
  .catch(next)
})
