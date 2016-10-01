var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;
var _type = require('../../config/constType');

var Product_category = product.define('Product_category', {
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
    timestamps: true,
    tableName: 'product_category'
});

module.exports = Product_category;

/*var Category = require('./category');

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
  as: 'categorys',
  foreignKey: 'product_id',
  constraints: false
});

Category.belongsToMany(Door, {
  through: {
    model: Product_category,
    unique: false,
    scope: {
      type: _type.door
    }
  },
  as:  'doors',
  foreignKey: 'category_id',
  constraints: false
});

Door.addScope('categorys', {
  include: [
    { model: Category, as: 'categorys'}
  ]
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
});*/

//Product_category.sync();