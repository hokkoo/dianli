var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;

var Tag = product.define('Tag', {
    id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        autoIncrement: true
    },
    // 父级
    parent_id: {
         type: Sequelize.BIGINT(20)
    },
    // 外部引用的id
    related_id :{
        type : Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING
    },
    desc: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING
    },
    type: {
        type : Sequelize.INTEGER
    }
}, {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: "deletedAt",
    paranoid: true,
    tableName: 'Tag',
    schema:'product'
});

module.exports = Tag;

// Tag.sync();