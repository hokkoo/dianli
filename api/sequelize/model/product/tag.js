var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;

var Tag = product.define('Tag', {
    tag_id: {
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
    }
}, {
    tableName: 'Tag',
    schema:'product'
});

module.exports = Tag;
//Tag.sync();