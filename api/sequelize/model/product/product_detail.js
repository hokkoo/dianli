var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;

var Product_detail = product.define('Product_detail', {
    product_detail_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    relid: {
         type: Sequelize.BIGINT(20)
    },
    standard_id: {
        type: Sequelize.INTEGER
    }
}, {
    tableName: 'product_detail',
    schema:'product'
});

module.exports = Product_detail;
//Product_detail.sync();