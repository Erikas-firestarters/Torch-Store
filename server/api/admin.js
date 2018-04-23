const router = require('express').Router();
const { User } = require('../db/models');
const HttpError = require('../utils/HttpError');
module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll({
    // attributes: ['id', 'email', 'firstName', 'lastName', 'isAdmin', 'password'],
  })
    .then(users => res.json(users))
    .catch(next);
});
