var Sequelize = require('sequelize');
var trade = require("../../config/sequelize").trade;
var Selling = trade.define('Selling', {
    selling_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    order_no :{
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
     //第三方单号
    other_no :{
        type: Sequelize.BIGINT(20)
    },
    product_id :{
        type: Sequelize.BIGINT(20),
    },
    user_id :{
          type : Sequelize.INTEGER
    },
    priceinfo_rule_id :{
        type : Sequelize.INTEGER
    },
    //规则描述，如：
    //  优惠券规则：
    //      类型 type
    //      券号
    //      描述
    //  满减
    //      类型
    //      满30-10
    //      条件
    priceinfo_rule_desc :{
        type : Sequelize.STRING
    },
    original_price:{
        type : Sequelize.DECIMAL
    },
    price :{
        type : Sequelize.DECIMAL
    },
    discount :{
        type : Sequelize.DECIMAL
    },
    gab_price :{
        type : Sequelize.DECIMAL
    },
    total_price :{
        type : Sequelize.DECIMAL
    },
    total_original_price:{
        type : Sequelize.DECIMAL
    },
    total_discount :{
        type : Sequelize.DECIMAL
    },
    total_gap_price:{
        type : Sequelize.DECIMAL
    },
    number :{
        type : Sequelize.INTEGER
    },
    size:{
        type : Sequelize.INTEGER
    },
    refund_number :{
        type : Sequelize.INTEGER
    },
    refund_price :{
        type : Sequelize.DECIMAL
    },
    final_number :{
        type : Sequelize.INTEGER
    },
    final_price :{
        type : Sequelize.DECIMAL
    },
    //退款信息
    //  每一次退款信息都加进去
    //      列表形式
    refund_desc :{
        type : Sequelize.STRING
    },

    title :{
        type : Sequelize.STRING
    },
    desc :{
        type : Sequelize.STRING
    },
    content :{
        type : Sequelize.STRING
    },
    //额外信息
    // 包括：订单详细列表（包括所有商品的价格及数量明细）
    status :{
        type : Sequelize.INTEGER //1，代付款；2，已付款；3，订单完成；4，订单结束；5，申请部分退款；6，部分退款；7，申请全额退款；8，全额退款成功；订单取消；
    },
    auditor_id :{
        type : Sequelize.INTEGER
    },
    operator_id :{
        type : Sequelize.INTEGER
    },
    //是否已审批
    is_audio :{
        type : Sequelize.INTEGER //1，已审批；0，未审批。一般订单设置为已审批；需要审批的订单按审批进度设值。
    }
    //
}, {
    tableName: 'Selling',
    schema:'trade'
});

module.exports = Selling;
//Selling.sync();