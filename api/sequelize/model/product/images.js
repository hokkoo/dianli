var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;

var Images = product.define('Images', {
    id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    size:{
        type : Sequelize.INTEGER
    },
    name :{
        type : Sequelize.STRING
    },
    title :{
        type : Sequelize.STRING
    },
    desc :{
        type : Sequelize.STRING
    },
    url :{
        type : Sequelize.STRING
    },
    extension :{
        type : Sequelize.STRING
    },
    // 关联id，代表图片来源于哪里
    // 特定于图片之间的复制
    refer_id :{
        type : Sequelize.INTEGER
    },
    // 外部引用的id
    // 所有图片都单独对应于一个外部引用
    related_id :{
        type : Sequelize.INTEGER
    },
    type: {
            type : Sequelize.INTEGER
    }
}, {
    tableName: 'Images',
    schema:'product'
});

module.exports = Images;

var Bed = require('./bed');
Bed.hasMany(Images, {
  foreignKey: 'related_id',
  constraints: false,
  as: 'images',
  scope: {
    type: 1
  }
});


//Image.sync();