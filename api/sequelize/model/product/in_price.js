var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;
var In_price = product.define('In_price', {
    in_price_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    unit :{
        type :Sequelize.INTEGER
    },
    amout : {
        type :Sequelize.DECIMAL
    },
    discount_price :{
        type :Sequelize.DECIMAL
    },
    min_price :{
        type :Sequelize.DECIMAL
    },
     max_price :{
        type :Sequelize.DECIMAL
    },
    average_price :{
        type :Sequelize.DECIMAL
    },
    //定价规则/当前
    price_rule_id :{
         type :Sequelize.INTEGER
    },
    //进价规则描述及历史数据
    price_rules :{
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    desc: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING
    }
}, {
    tableName: 'In_price',
    schema:'product'
});

module.exports = In_price;
//In_price.sync();