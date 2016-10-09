/*
    价格规则
    1:
        数量 ：价格

*/
var Sequelize = require('sequelize');
var base = require("../../config/sequelize").base;
var _type = require('../../config/constType');

var Price_rule = base.define('Price_rule', {
    id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        autoIncrement: true
    },
    size: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
    },
    // 百分比
    percent: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
    },
    price: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
    },
    // 默认与price单位一致
    unit: {
        type: Sequelize.STRING
    },
    // 外部引用的id
    // 所有价格都单独对应于一个外部引用
    related_id :{
        type : Sequelize.INTEGER
    },
    type: {
        type : Sequelize.INTEGER,
        defaultValue: 0
    }
}, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    timestamps: true,
    paranoid: true,
    tableName: 'price_rule'
});

module.exports = Price_rule;

var Price = require('./price.js');
Price.hasMany(Price_rule, {
  as: 'rules',
  foreignKey: 'related_id',
  constraints: false
});
//Price_rule.sync();