var Sequelize = require('sequelize');
var trade = require("../../config/sequelize").trade;

var Order_snapshot = trade.define('Order_snapshot', {
    order_snapshot_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    order_no :{
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    detail :{
        type : Sequelize.STRING 
    },
    //之前订单操作所对应的json数据
    // 1，修改订单（记录订单）；2，修改订单里的产品（记录产品）；
    status : {
        type : Sequelize.INTEGER 
    },
    type :{
       type :Sequelize.INTEGER //0,，进货；1，卖出；
    }
}, {
    tableName: 'Order_snapshot',
    schema:'trade'
});

module.exports = Order_snapshot;
//Order_snapshot.sync();