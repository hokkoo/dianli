var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;
var _type = require('../../config/constType');

var Product_category = product.define('Product_category', {
    id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        autoIncrement: true
    },
    category_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    product_id: {
         type: Sequelize.BIGINT(20),
         primaryKey: true
    },
    type: {
        type : Sequelize.INTEGER
    }
}, {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: "deletedAt",
    paranoid: true,
    tableName: 'product_category',
    schema:'product'
});

module.exports = Product_category;

var Category = require('./category');

var Bed = require('./bed');
Bed.belongsToMany(Category, {
  through: {
    model: Product_category,
    unique: false,
    scope: {
      type: _type.bed
    }
  },
  foreignKey: 'product_id',
  constraints: false
});


var Door = require('./door');
Door.belongsToMany(Category, {
  through: {
    model: Product_category,
    unique: false,
    scope: {
      type: _type.door
    }
  },
  foreignKey: 'product_id',
  constraints: false
});

var Ware = require('./ware');
Ware.belongsToMany(Category, {
  through: {
    model: Product_category,
    unique: false,
    scope: {
      type: _type.ware
    }
  },
  foreignKey: 'product_id',
  constraints: false
});

// Product_category.sync();