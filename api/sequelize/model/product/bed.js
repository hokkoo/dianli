var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;

var Bed = product.define('Bed', {
    id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    detail_id: Sequelize.BIGINT(20),
    parent_id: Sequelize.BIGINT(20),
    price_id: Sequelize.BIGINT(20),
    category_id: Sequelize.BIGINT(20),
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
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: "deletedAt",
    paranoid: true,
    tableName: 'bed',
    schema:'product'
});

module.exports = Bed;
// Bed.sync();