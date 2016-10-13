var Sequelize = require('sequelize');
var company = require("../../config/sequelize").company;
var _type = require('../../config/constType');

var Shop = company.define('Shop', {
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
    name: {
        type: Sequelize.STRING
    },
    fullname: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    desc: {
        type: Sequelize.STRING
    },
    // 法人
    // 都指向联系人
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
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    address: {
        type: Sequelize.STRING
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
    tableName: 'shop',
    schema:'company'
});

module.exports = Shop;

var Image = require('./company-image.js');

Company.hasMany(Image, {
  as: 'images',
  foreignKey: 'related_id',
  constraints: false
});

var Contact = require('../user/contact.js');
/*Company.hasOne(Contact, {
    as: 'owner',
    foreignKey: 'owner_id',
    constraints: false
});*/

Company.belongsTo(Contact, {
    as: 'owner',
    foreignKey: 'owner_id',
    constraints: false
});


Company.sync();