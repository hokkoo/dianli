var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;

var Image = product.define('Image', {
    image_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    size:{
        type : Sequelize.INTEGER
    },
    title :{
        type : Sequelize.STRING
    },
    desc :{
        type : Sequelize.STRING
    },
    content :{
        type : Sequelize.STRING
    },
    properties :{
        type : Sequelize.STRING
    }
}, {
    tableName: 'Image',
    schema:'product'
});

module.exports = Image;

//Image.sync();