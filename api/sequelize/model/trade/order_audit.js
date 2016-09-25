var Sequelize = require('sequelize');
var user = require("../../config/sequelize").user;

var Order_audit = user.define('Order_audit', {
    Order_audit_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    order_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    auditor_id: {
         type: Sequelize.BIGINT(20),
         primaryKey: true
    },
    type :{
        type :Sequelize.INTEGER //1，in_price；2，out_price；3，wholesale_price
    }
}, {
    tableName: 'Order_audit',
    schema:'user'
});

module.exports = Order_audit;
//Order_audit.sync();
