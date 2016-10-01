var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;
var _type = require('../../config/constType');

var Category = product.define('Category', {
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
    }
}, {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    tableName: 'category'
});

module.exports = Category;

// Category目前只有n:1关系
var Door = require('./door');
Door.belongsTo(Category, {
    as: 'category',
    foreignKey: 'category_id',
    constraints: false
});
Category.hasMany(Door, {
    as: 'doors',
    foreignKey: 'category_id',
    scope: {
      type: _type.door
    },
    constraints: false
});

//Category.sync();