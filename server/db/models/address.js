const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
    fullName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    addressLine1: {
        type: Sequelize.STRING,
        allowNull: false
    },
    addressLine2: {
        type: Sequelize.STRING,
        allowNull: true
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    zipcode: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Address
