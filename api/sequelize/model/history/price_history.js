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
var history = require("../../config/sequelize").history;

var PriceHistory = history.define('PriceHistory', {
    id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
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
    // 关联id，对应的price id
    refer_id :{
        type : Sequelize.INTEGER
    }
}, {
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    paranoid: true,
    tableName: 'price_history',
    schema:'history'
});

module.exports = PriceHistory;
// PriceHistory.sync();