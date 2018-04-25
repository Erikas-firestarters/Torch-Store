const { expect } = require('chai')
const db = require('../index')
const Category = db.model('category')
const Product = db.model('product')

describe('Category model', () => {
  let category;
  let product;

  beforeEach(async () => {
    category = await Category.build({name: 'analog'});
    product = await Product.build({
      name: 'El Flamo',
      description: 'hotter than hell, (batteries not included)',
      price: 40.44,
      inventory: 20,
    });
  })

  it('`name` cannot be null', () => {
    category.name = null;
    return category.validate()
      .then(() => {
        throw new Error('validation should fail when content is null');
      },
        function (result) {
          expect(result).to.be.an.instanceOf(Error);
        });
  });
})
