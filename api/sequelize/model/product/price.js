/*
    价格
    多种价格组合
    1:
        原价
        最低价
        最高价
        均价


    TODO
        将价格作为可复用的
*/
var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;
var _type = require('../../config/constType');

var Price = product.define('Price', {
    id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        autoIncrement: true
    },
    // 设定价格
    value: {
        type: Sequelize.DECIMAL
    },
    min: {
        type: Sequelize.DECIMAL
    },
    max: {
        type: Sequelize.DECIMAL
    },
    average: {
        type: Sequelize.DECIMAL
    },
    unit: {
        type: Sequelize.STRING
    },
    // 关联id，代表价格来源于哪里
    // 特定于价格之间的复制
    refer_id :{
        type : Sequelize.INTEGER
    },
    // 外部引用的id
    // 所有价格都单独对应于一个外部引用
    related_id :{
        type : Sequelize.INTEGER
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
    tableName: 'price'
});

module.exports = Price;

var Door = require('./door');
Door.belongsTo(Price, {
  foreignKey: 'price_id',
  constraints: false,
  as: 'price'
});

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

Price.sync();