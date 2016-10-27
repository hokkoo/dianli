var Sequelize = require('sequelize');
var company = require("../../config/sequelize").company;
var _type = require('../../config/constType');

var Brand = company.define('Brand', {
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
    company_id :{
        type : Sequelize.INTEGER,
        defaultValue: 0
    },
    // 外部引用的id
    related_id :{
        type : Sequelize.INTEGER,
        defaultValue: 0
    },
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
    tableName: 'brand',
    schema:'company'
});

module.exports = Brand;

var Image = require('./company-image.js');

Brand.hasMany(Image, {
  as: 'images',
  foreignKey: 'related_id',
  constraints: false,
  scope: {
    type: _type.brand.image
  }
});

Brand.sync();