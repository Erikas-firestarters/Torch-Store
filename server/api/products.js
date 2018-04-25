const router = require('express').Router();
const { Product, Review, Category } = require('../db/models');
const HttpError = require('../utils/HttpError');
const {adminsOnly} = require('../utils/gatekeeper');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [{
          model: Category,
          as: 'categories',
          required: false,
          through: { attributes: [] },
        }],
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.param('id', (req, res, next, id) => {
  Product.findById(id, {
    include: [{
      model: Category,
      as: 'categories',
      required: false,
      through: { attributes: [] },
    }],
  })
    .then(product => {
      if (!product) throw new HttpError(404);
      req.product = product;
      next();
    })
    .catch(next);
});
router.get('/:id', (req, res, next) => {
  res.json(req.product)
});

router.put('/:id', adminsOnly, (req, res, next) => {
  req.product
    .update(req.body)
    .then(newProduct => Product.findById(newProduct.id, {
      include: [{
          model: Category,
          as: 'categories',
          required: false,
          through: { attributes: [] },
        }],
    }))
    .then(foundFullProduct => {
      res.json(foundFullProduct)})
    .catch(next)
});

router.post('/', adminsOnly, (req, res, next) => {
  Product.create(req.body)
    .then(newProduct => Product.findById(newProduct.id, {
      include: [{
          model: Category,
          as: 'categories',
          required: false,
          through: { attributes: [] },
        }],
    }))
    .then(foundFullProduct => {
      res.json(foundFullProduct)})
    .catch(next)
});

router.delete('/:id', adminsOnly, (req, res, next) => {
  req.product
    .destroy()
    .then(() => res.sendStatus(204))
    .catch(next)
});


router.get('/:id/reviews', (req, res, next) => {
  Review.findAll({
    where: {
      productId: req.params.id,
    },
  })
    .then(reviews => res.json(reviews))
    .catch(next);
});

router.post('/:id/reviews', (req, res, next) => {
  Review.create(req.body)
    .then(review => {
      res.json(review);
    })
    .catch(next);
});
