const {expect} = require('chai')
const db = require('../index')
const Address = db.model('address')

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
