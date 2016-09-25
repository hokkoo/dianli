var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;

var Priceinfo = product.define('Priceinfo', {
    priceinfo_id: {
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
    title: {
        type: Sequelize.STRING
    },
    desc: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING
    },
    //进价信息
    in_price : {
        type :Sequelize.INTEGER
    }
}, {
    tableName: 'Priceinfo',
    schema:'product'
});

module.exports = Priceinfo;
//Priceinfo.sync();