const { expect } = require('chai')
const db = require('../index')
const Review = db.model('review')

describe('Review model', () => {

    beforeEach(() => {
        return db.sync({ force: true })
    })

    var review
    beforeEach(() => {
        review = Review.build({
            title: 'Best review ever',
            content: 'Friggin flames forever with this phenomenal torch from Frys Eternal Torches.',
            rating: 5
        })

        afterEach(function () {
            return Promise.all([
                review.truncate({ cascade: true }),
            ]);
        });

        describe('definition', () => {

            it('has expected all expected fields title, content, and rating', () => {
                return review.save()
                    .then((savedReview) => {
                        expect(savedReview.title).to.equal('Best review ever')
                        expect(savedReview.content).to.equal('Friggin flames forever with this phenomenal torch from Frys Eternal Torches.')
                        expect(savedReview.rating).to.equal(5)
                    })
            });

            it('requires `title`', () => {

                review.title = null;

                return review.validate()
                    .then(() => {
                        throw new Error('validation should fail when content is null');
                    },
                        function (result) {
                            expect(result).to.be.an.instanceOf(Error);
                        });
            });

            it('requires `content`', () => {

                review.content = null;

                return review.validate()
                    .then(() => {
                        throw new Error('validation should fail when content is null');
                    },
                        function (result) {
                            expect(result).to.be.an.instanceOf(Error);
                        });
            });

            it('requires `rating` to be less than 5', () => {

                review.rating = 6;

                return review.validate()
                    .then(() => {
                        throw new Error('validation should fail when content is more than 5');
                    },
                        function (result) {
                            expect(result).to.be.an.instanceOf(Error);
                        });
            });

            it('requires `rating` to be more than 0', () => {

                review.rating = -1;

                return review.validate()
                    .then(() => {
                        throw new Error('validation should fail when content is less than 0');
                    },
                        function (result) {
                            expect(result).to.be.an.instanceOf(Error);
                        });
            });

        })
    })
})