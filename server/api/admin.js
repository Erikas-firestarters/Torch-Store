const router = require('express').Router();
const { User } = require('../db/models');
const HttpError = require('../utils/HttpError');
const {adminsOnly} = require('../utils/gatekeeper');
module.exports = router;

router.get('/', adminsOnly, (req, res, next) => {
  User.findAll({
    // attributes: ['id', 'email', 'firstName', 'lastName', 'isAdmin', 'password'],
  })
    .then(users => res.json(users))
    .catch(next);
});
