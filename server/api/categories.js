const router = require('express').Router();
const { Product, Category } = require('../db/models');
const {adminsOnly} = require('../utils/gatekeeper');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  }
  catch (err) {
    next(err);
  }
})

router.post('/', adminsOnly, async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  }
  catch (err) {
    next(err);
  }
})


router.delete('/:id', adminsOnly, async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    await category.destroy(req.body);
    res.sendStatus(204);
  }
  catch (err) {
    next(err);
  }
})
