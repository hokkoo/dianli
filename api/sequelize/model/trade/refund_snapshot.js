var Sequelize = require('sequelize');
var trade = require("../../config/sequelize").trade;
var Refund_snapshot = trade.define('Refund_snapshot', {
    refund_snapshot_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    refund_no :{
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
    tableName: 'Refund_snapshot',
    schema:'trade'
});

module.exports = Refund_snapshot;
//Refund_snapshot.sync();