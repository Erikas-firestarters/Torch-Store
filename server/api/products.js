const router = require('express').Router()
const { Product, Review } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(next)
})

router.get('/:id/reviews', (req, res, next) => {
  Review.findAll({
    where: {
      productId: req.params.id
    }
  })
    .then(reviews => res.json(reviews))
    .catch(next)
})

router.post('/:id/reviews', (req, res, next) => {
  Review.create(req.body)
    .then(review => res.json(review))
    .catch(next)
})
