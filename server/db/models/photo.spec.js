// /* global describe beforeEach it */
// /* eslint-disable no-unused-expressions */

// const {expect} = require('chai')
// const db = require('../index')
// const Photo = db.model('photo')
// const Product = db.model('product')

// describe('Photo model', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('Test new photo values', () => {
//     let currentPhoto;
//     let tiki;

//     beforeEach( async () => {
//       tiki = await Product.create({
//         name: 'Tiki Torch',
//         description: 'TIKI Torches will brighten up the backyard party and provide proven mosquito repellency when used with TIKI Brand Bitefighter fuel. Shop our variety of metal, bamboo and glass',
//         price: 52.55,
//         inventory: 500,
//       })

//       currentPhoto = await Photo.build({
//         imageUrl: 'https://loremflickr.com/g/320/240/paris',
//       })
//       currentPhoto.setProduct(tiki);
//       currentPhoto.save();

//     })

//     it('imageUrl should contain "paris"', () => {
//       expect(currentPhoto.imageUrl).to.contain('paris')
//     })
//     it('productId property should exist', () => {
//       expect(currentPhoto.productId).to.exist;
//     })

//   })
// }) // end describe('Photo model')
