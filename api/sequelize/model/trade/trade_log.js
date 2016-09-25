var Sequelize = require('sequelize');
var trade = require("../../config/sequelize").trade;

var Trade_log = trade.define('Trade_log', {
    trade_log_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    order_no :{
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    refund_no:{
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    product_id :{
        type: Sequelize.INTEGER
    },
    product_snashot :{
        type : Sequelize.STRING
    },
    type :{
        type :Sequelize.INTEGER //类型，现与rel_table一样的值
    },
    rel_table :{
        type :Sequelize.INTEGER 
    },
    operation :{
        type :Sequelize.INTEGER  //操作：0，增加；1，减少；2，删除；3，新增；4，修改
    },
    //数量
    number : {
        type :Sequelize.INTEGER
    },
    //价格
    price :{
        type :Sequelize.INTEGER
    },
    //对应的快照
    order_snapshot :{
         type :Sequelize.INTEGER 
     },
    status : {
        type : Sequelize.INTEGER //状态：0，正常；1，发生退货；2，发生退款；3，召回
    },
    operator :{
        type :Sequelize.STRING
    },
    //当前登录用户
    user_id :{
        type :Sequelize.STRING
    },
    //额外信息，如IP地址；用户信息；此为快照，json格式。
    extra :{
        type :Sequelize.STRING
    },
}, {
    tableName: 'Trade_log',
    schema:'trade'
});

module.exports = Trade_log;
//Trade_log.sync();