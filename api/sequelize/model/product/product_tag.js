var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;

var Product_tag = product.define('Product_tag', {
    product_tag_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    tag_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    product_id: {
         type: Sequelize.BIGINT(20),
         primaryKey: true
    }
}, {
    tableName: 'Product_tag',
    schema:'product'
});

module.exports = Product_tag;
//Product_tag.sync();