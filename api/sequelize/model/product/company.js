var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;
var _type = require('../../config/constType');

var Company = product.define('Company', {
    id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        autoIncrement: true
    },
    // 父级
    parent_id: {
         type: Sequelize.BIGINT(20),
         defaultValue: 0
    },
    // 外部引用的id
    related_id :{
        type : Sequelize.INTEGER,
        defaultValue: 0
    },
    // 公司代号
    code: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    desc: {
        type: Sequelize.STRING
    },
    // 法人
    owner_id: {
         type: Sequelize.BIGINT(20),
         defaultValue: 0
    },
    phone: {
        type: Sequelize.STRING
    },
    mobile: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING
    },
    location_id: {
        type: Sequelize.INTEGER
    },
    address: {
        type: Sequelize.STRING
    },
    type: {
        type : Sequelize.INTEGER
    },
    // 二级分类
    sub_type: {
        type : Sequelize.INTEGER
    }
}, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    timestamps: true,
    paranoid: true,
    tableName: 'company'
});

module.exports = Company;

Company.sync();