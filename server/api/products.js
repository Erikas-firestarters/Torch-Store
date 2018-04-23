const router = require('express').Router();
const { Product, Review, Category } = require('../db/models');
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

router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => {
      res.json(product);
    })
    .catch(next);
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
