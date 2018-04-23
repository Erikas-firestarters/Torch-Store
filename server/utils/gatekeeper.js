const adminsOnly = (req, res, next) => {
  if (req.user && req.user.isAdmin) return next();
  else next('Not Allowed!! Admins only, fool!')
};

const selfOrAdmin = (req, res, next) => {
  if (req.user.id === req.params.id) return next()
  else res.redirect('/auth');

}

module.exports = {adminsOnly, selfOrAdmin}
