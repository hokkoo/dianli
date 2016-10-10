/*
    图库，
    用于快速建立图片库
*/
var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;
var _type = require('../../config/constType');

var Gallery = product.define('Gallery', {
    id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    detail_id: {
        type:Sequelize.BIGINT(20),
        defaultValue: 0
    },
    parent_id: {
        type:Sequelize.BIGINT(20),
        defaultValue: 0
    },
    category_id: {
        type:Sequelize.BIGINT(20),
        defaultValue: 0
    },
    desc: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.TEXT
    },
    // 特定于同类之间之间的复制
    refer_id :{
        type : Sequelize.INTEGER,
        defaultValue: 0
    },
    // 外部引用的id
    // 所有价格都单独对应于一个外部引用
    related_id :{
        type : Sequelize.INTEGER,
        defaultValue: 0
    },
    type: {
        type : Sequelize.INTEGER,
        defaultValue: 0
    }
}, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    timestamps: true,
    paranoid: true,
    tableName: 'Gallery'
});

module.exports = Gallery;



var GalleryImage = require('./gallery-image.js');

Gallery.hasMany(GalleryImage, {
  as: 'images',
  foreignKey: 'related_id',
  constraints: false
});


/*Door.belongsTo(Price, {
  foreignKey: 'price_id',
  constraints: false,
  as: 'price'
});*/

// var Bed = require('../product/bed');
// Bed.belongsTo(Price, {
//   foreignKey: 'price_id',
//   constraints: false,
//   as: 'price',
//   scope: {
//     type: _type.bed
//   }
// });


// var Ware = require('../product/ware');
// Ware.belongsTo(Price, {
//   foreignKey: 'price_id',
//   constraints: false,
//   as: 'price',
//   scope: {
//     type: _type.ware
//   }
// });

Gallery.sync();