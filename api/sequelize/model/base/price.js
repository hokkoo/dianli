/*
    价格
    多种价格组合
    1:
        原价
        最低价
        最高价
        均价


    TODO
        将价格作为可复用的
*/
var Sequelize = require('sequelize');
var base = require("../../config/sequelize").base;

var Price = base.define('Price', {
    id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    min: {
        type: Sequelize.DECIMAL
    },
    max: {
        type: Sequelize.DECIMAL
    },
    average: {
        type: Sequelize.DECIMAL
    },
    unit: {
        type: Sequelize.STRING
    }
}, {
    tableName: 'price',
    schema:'base'
});

module.exports = Price;
//Product.sync();