var Sequelize = require('sequelize');
var trade = require("../../config/sequelize").trade;
var Order_operator = trade.define('Order_operator', {
    Order_operator_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    order_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    operatoror_id: {
         type: Sequelize.BIGINT(20),
         primaryKey: true
    },
    type :{
        type :Sequelize.INTEGER //1，in_price；2，out_price；3，wholesale_price
    }
}, {
    tableName: 'Order_operator',
    schema:'trade'
});

module.exports = Order_operator;
//Order_operator.sync();