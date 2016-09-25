var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;

var Category = product.define('Category', {
    category_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    superid: {
         type: Sequelize.BIGINT(20)
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
    icon: {
        type: Sequelize.STRING
    }
}, {
    tableName: 'category',
    schema:'product'
});

module.exports = Category;
//Category.sync();