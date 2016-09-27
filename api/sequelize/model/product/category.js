var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;
var _type = require('../config/constType');

var Category = product.define('Category', {
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
    }，
    type: {
        type : Sequelize.INTEGER
    }
}, {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: "deletedAt",
    paranoid: true,
    tableName: 'category',
    schema:'product'
});

module.exports = Category;


var Bed = require('./bed');
Bed.belongsTo(Category, {
  foreignKey: 'category_id',
  constraints: false,
  as: 'category',
  scope: {
    type: _type.bed
  }
});


var Door = require('./door');
Door.belongsTo(Category, {
  foreignKey: 'category_id',
  constraints: false,
  as: 'category',
  scope: {
    type: _type.door
  }
});

var Ware = require('./ware');
Ware.belongsTo(Category, {
  foreignKey: 'category_id',
  constraints: false,
  as: 'category',
  scope: {
    type: _type.ware
  }
});

//Tag.sync();