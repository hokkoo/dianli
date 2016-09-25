var Sequelize = require('sequelize');
var user = require("../../config/sequelize").user;
//进货的退款信息
var Customer = user.define('Customer', {
    customer_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    refund_no :{
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
    incoming_id :{
        type: Sequelize.BIGINT(20),
    },
    //与进价规则ID一致，采用退款部分的规则
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
    //原订单金额
    order_price:{
        type : Sequelize.DECIMAL
    },
    number :{
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
    status :{
        type : Sequelize.INTEGER //1，已申请退款；2，审核通过；3，审核不通过；4，退款中；5，退款失败；6，退款成功；
    },
    //退款额外信息，如失败原因；审核不通过原因；为什么只退了一部分；
    extra :{
        type :Sequelize.STRING
    },
    auditor_id :{
        type : Sequelize.INTEGER
    },
    operator_id :{
        type : Sequelize.INTEGER
    }
    //
}, {
    tableName: 'Customer',
    schema:'user'
});

module.exports = Customer;
//Customer.sync();