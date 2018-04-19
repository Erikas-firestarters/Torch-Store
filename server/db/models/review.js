const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
            min: 0,
            max: 5
        }
    }
})

module.exports = Review
