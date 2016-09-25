var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;

var Product_image = product.define('Product_image', {
    product_image_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    image_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    //媒体类型
    product_id: {
         type: Sequelize.BIGINT(20),
         primaryKey: true
    }
}, {
    tableName: 'Product_image',
    schema:'company'
});

module.exports = Product_image;
//Product_image.sync();
