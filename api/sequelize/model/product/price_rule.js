var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;
/*
*   价格规则，目前只是描述信息，并关联到具体规矩计算中间件
*/
var Price_rule = product.define('Price_rule', {
    price_rule_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    /**
    *   价格类型/场景
    *   1，按场景:
    *       a)首次购买
    *       b)优惠活动购买
    *   2，计量折扣
    *   3，用券/优惠券/现金券 计算
    */
    type: {
         type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
     //规则描述，一般是用字段表示，如:
    //  首单立减10元
    //  满20减1
    //  满100个打九折
    //  满1999打九折
    desc: {
        type: Sequelize.STRING
    },
    //对应的退款方式
    //  能退款，但要扣除全部优惠金额
    //  按比例扣除优惠金额
    refund_desc :{
        type: Sequelize.STRING
    },
    //退款计算方式
    refund_calculator :{
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING
    },
    calculator :{
        type: Sequelize.STRING
    }
}, {
    tableName: 'Price_rule',
    schema:'product'
});

module.exports = Price_rule;

//Price_rule.sync();