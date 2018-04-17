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
        allowNull: false,
        validate: { len: 2 }
    },
    zipcode: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: { len: 5 }
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true,
    }
})

module.exports = Address
