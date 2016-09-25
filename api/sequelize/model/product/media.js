var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;

var Media = product.define('Media', {
    media_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    //媒体类型
    type: {
         type: Sequelize.STRING
    },
    rel_id: {
        type: Sequelize.INTEGER
    }
}, {
    tableName: 'media',
    schema:'product'
});

module.exports = Media;
//Media.sync();
