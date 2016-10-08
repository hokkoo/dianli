var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;

// 联系人信息
var Contact_detail = product.define('Contact_detail', {
    id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        autoIncrement: true
    },
    location_home_id: {
        type: Sequelize.INTEGER
    }
    address_home: {
        type: Sequelize.STRING
    },
    location_businese_id: {
        type: Sequelize.INTEGER
    }
    address_businese: {
        type: Sequelize.STRING
    },
    mobile_businese: {
        type: Sequelize.STRING
    },
    email_businese: {
        type: Sequelize.STRING
    },
    phone_businese: {
        type: Sequelize.STRING
    },
    mobile_home: {
        type: Sequelize.STRING
    },
    email_home: {
        type: Sequelize.STRING
    },
    phone_home: {
        type: Sequelize.STRING
    },
    department: {
        type: Sequelize.STRING
    },
    job: {
        type: Sequelize.STRING
    }
}, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    timestamps: true,
    paranoid: true,
    tableName: 'contact_detail'
});

module.exports = Contact_detail;

Contact_detail.sync();