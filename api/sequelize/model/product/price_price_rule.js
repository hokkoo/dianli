var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;
var Price_price_rule = product.define('Price_price_rule', {
    price_price_rule_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    price_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    price_rule_id: {
         type: Sequelize.BIGINT(20),
         primaryKey: true
    },
    //1，in_price；2，out_price；3，wholesale_price
    type :{
        type:Sequelize.INTEGER
    }
}, {
    tableName: 'Price_price_rule',
    schema:'product'
});

module.exports = Price_price_rule;
//Price_price_rule.sync();