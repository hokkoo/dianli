var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;
var _type = require('../../config/constType');

var GalleryImage = product.define('GalleryImage', {
    id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        autoIncrement: true
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
    originalname :{
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
        type : Sequelize.INTEGER,
        defaultValue: 0,
    },
    // 外部引用的id
    // 所有图片都单独对应于一个外部引用
    related_id :{
        type : Sequelize.INTEGER,
        defaultValue: 0,
    },
    type: {
        type : Sequelize.INTEGER
    }
}, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    timestamps: true,
    paranoid: true,
    tableName: 'gallery_image'
});

module.exports = GalleryImage;

GalleryImage.sync();