router.get('/:id/cart', (req, res, next) => {
  const { id } = req.requestedUser;
  Cart.findOne({
    where: { userId: id },
    include: [{ model: CartItem, include: [Product] }],
  })
    .then(cart => res.json(cart))
    .catch(next);
});
router.post('/:id/cart', (req, res, next) => {
  Cart.build(req.body)
    .then(cart => cart.setUser(req.requestedUser))
    .save()
    .then(cart => res.json(cart))
    .catch(next);
});
router.delete('/:id/cart', (req, res, next) => {
  const { id } = req.requestedUser;
  Cart.findOne({ where: { userId: id } })
    .then(() => res.sendStatus(204))
    .catch(next);
});
