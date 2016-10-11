var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;
var _type = require('../../config/constType');
/*
    产品属性表，目前只有两层结构
    如 ：门 => 色泽 => 金属
                 1 : n     1 : n
 */

var Property = product.define('Property', {
    id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        autoIncrement: true
    },
    // 父级
    parent_id: {
         type: Sequelize.BIGINT(20),
         defaultValue: 0
    },
    // 外部引用的id
    related_id :{
        type : Sequelize.INTEGER,
        defaultValue: 0
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
    },
    // 二级分类
    sub_type: {
        type : Sequelize.INTEGER,
        defaultValue: 0
    }
}, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    timestamps: true,
    paranoid: true,
    tableName: 'Property'
});

module.exports = Property;

Property.sync();