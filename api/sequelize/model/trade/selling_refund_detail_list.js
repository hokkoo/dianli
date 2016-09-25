var Sequelize = require('sequelize');
var trade = require("../../config/sequelize").trade;
var Selling_refund_detail_list = trade.define('Selling_refund_detail_list', {
    selling_refund_detail_list_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    order_no :{
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    selling_detail_list_id :{
        type: Sequelize.INTEGER
    },
    //商品快照
    // 建议描述，包括：时间，价格，定价规则，标题，描述
    //数量
    number : {
        type :Sequelize.INTEGER
    },
    status : {
        type : Sequelize.INTEGER //状态：0，正常；1，发生退货；2，发生退款；3，召回
    }
}, {
    tableName: 'Selling_refund_detail_list',
    schema:'trade'
});

module.exports = Selling_refund_detail_list;
//Selling_refund_detail_list.sync();