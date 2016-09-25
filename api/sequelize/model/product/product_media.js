var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;

var Product_Media = product.define('Product_Media', {
    product_media_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    media_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    //媒体类型
    product_id: {
         type: Sequelize.BIGINT(20),
         primaryKey: true
    }
}, {
    tableName: 'Product_Media',
    schema:'product'
});

module.exports = Product_Media;
//Product_Media.sync();