var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;

var Product = product.define('Product', {
    product_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
    product_detail_id: Sequelize.BIGINT(20),
    desc: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.TEXT
    },
    tags: {
        type: Sequelize.STRING
    },
    unit :{
         type: Sequelize.INTEGER
    },
    unit_detail :{
        type: Sequelize.STRING
    },
    headpic: {
        type: Sequelize.STRING
    },
    priceinfo: {
        type: Sequelize.STRING
    },
    properties: {
        type: Sequelize.STRING
    },
    categories :{
        type: Sequelize.STRING 
    },
    standard :{
        type: Sequelize.STRING 
    },
    //进价信息
    in_price_id:{
        type: Sequelize.INTEGER
    },
    //售出价格
     out_price_id:{
        type: Sequelize.INTEGER
    },
    //批发价格
     wholesale_price_id:{
        type: Sequelize.INTEGER
    },
    //库存信息
    inventory_id:{
        type: Sequelize.INTEGER
    }
}, {
    tableName: 'product',
    schema:'product'
});

module.exports = Product;
//Product.sync();