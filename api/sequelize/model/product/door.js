var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;

var Door = product.define('Door', {
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
    detail_id: {
        type:Sequelize.BIGINT(20),
        defaultValue: 0
    },
    parent_id: {
        type:Sequelize.BIGINT(20),
        defaultValue: 0
    },
    price_id: {
        type:Sequelize.BIGINT(20),
        defaultValue: 0
    },
    category_id: {
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
    tableName: 'door'
});

module.exports = Door;

//Door.sync();