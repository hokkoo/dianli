var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;

// 联系人信息
var Contact = product.define('Contact', {
    id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    realName: {
        type: Sequelize.STRING
    },
    IDCard: {
        type: Sequelize.STRING
    },
    company_id: {
        type:Sequelize.BIGINT(20),
        defaultValue: 0
    },
    department: {
         type: Sequelize.STRING
    },
    email: {
         type: Sequelize.STRING
    },
    address: {
         type: Sequelize.STRING
    },
    location_id: {
         type: Sequelize.INTEGER
    },
    geography_lon: {
         type: Sequelize.STRING
    },
    geography_lat: {
         type: Sequelize.STRING
    },
    detail_id: {
        type:Sequelize.BIGINT(20),
        defaultValue: 0
    },
    parent_id: {
        type:Sequelize.BIGINT(20),
        defaultValue: 0
    },
    desc: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.TEXT
    },
    image: {
        type: Sequelize.STRING
    }
}, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    timestamps: true,
    paranoid: true,
    tableName: 'contact'
});

module.exports = Contact;

Contact.sync();