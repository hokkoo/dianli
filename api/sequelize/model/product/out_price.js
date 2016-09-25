var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;
var Out_price = product.define('Out_price', {
    out_price_id: {
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
    //定价规则
    price_rule_id :{
         type :Sequelize.INTEGER
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
    tableName: 'Out_price',
    schema:'product'
});

module.exports = Out_price;
//Out_price.sync();