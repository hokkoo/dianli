var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;

var Product_category = product.define('Product_category', {
    product_category_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    category_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    product_id: {
         type: Sequelize.BIGINT(20),
         primaryKey: true
    }
}, {
    tableName: 'Product_category',
    schema:'product'
});

module.exports = Product_category;
//Product_category.sync();