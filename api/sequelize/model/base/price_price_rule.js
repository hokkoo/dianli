var Sequelize = require('sequelize');
var base = require("../../config/sequelize").base;
var _type = require('../../config/constType');

var Price_price_rule = base.define('Price_price_rule', {
    price_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    price_rule_id: {
         type: Sequelize.BIGINT(20),
         primaryKey: true
    },
    type: {
        type : Sequelize.INTEGER,
        defaultValue: 0
    }
}, {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    timestamps: true,
    tableName: 'price_price_rule'
});

module.exports = Price_price_rule;


/*var Price_rule = require('./price_rule');
var Price = require('./price');
Price.belongsToMany(Price_rule, {
  through: {
    model: Price_price_rule,
    unique: false,
    scope: {
      type: _type.price
    }
  },
  as: 'rules',
  foreignKey: 'price_id',
  constraints: false
});

Price_rule.belongsToMany(Price, {
  through: {
    model: Price_price_rule,
    unique: false,
    scope: {
      type: _type.price
    }
  },
  as:  'price',
  foreignKey: 'category_id',
  constraints: false
});

Door.addScope('categorys', {
  include: [
    { model: Category, as: 'categorys'}
  ]
});*/

//Price_price_rule.sync();