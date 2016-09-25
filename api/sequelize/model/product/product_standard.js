var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;

var Product_standard = product.define('Product_standard', {
    product_standard_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    standard_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    //媒体类型
    product_id: {
         type: Sequelize.BIGINT(20),
         primaryKey: true
    }
}, {
    tableName: 'Product_standard',
    schema:'product'
});

module.exports = Product_standard;

//Product_standard.sync();