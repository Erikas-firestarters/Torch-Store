const { expect } = require('chai')
const db = require('../index')
const Category = db.model('category')

describe('Category model', () => {

    beforeEach(() => {
        return db.sync({ force: true })
    })

    var category
    beforeEach(() => {
        category = Category.build({
            name: 'analog'
        });
    })

    afterEach(function () {
        return Promise.all([
            Category.truncate({ cascade: true }),
        ]);
    });

    describe('definition', () => {

        it('has `name` field', () => {
            return category.save()
                .then((savedCategory) => {
                    expect(savedCategory.name).to.equal('analog')

                })
        });

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
})
