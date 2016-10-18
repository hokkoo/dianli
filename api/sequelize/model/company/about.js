var Sequelize = require('sequelize');
var company = require("../../config/sequelize").company;
var _type = require('../../config/constType');

var About = company.define('About', {
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
    content: {
        type: Sequelize.STRING
    },
    // 公司ID
    company_id: {
         type: Sequelize.BIGINT(20),
         defaultValue: 0
    },
    phone: {
        type: Sequelize.STRING
    },
    mobile: {
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
    tableName: 'about',
    schema:'company'
});

module.exports = About;

var Image = require('./company-image.js');

About.hasMany(Image, {
  as: 'images',
  foreignKey: 'related_id',
  constraints: false,
  scope: {
    type: _type.about.image
  }
});

var Contact = require('../user/contact.js');

About.hasMany(Contact, {
  as: 'contacts',
  constraints: false,
  foreignKey: 'company_id'
});


About.sync();