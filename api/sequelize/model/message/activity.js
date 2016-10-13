var Sequelize = require('sequelize');
var message = require("../../config/sequelize").message;
var _type = require('../../config/constType');

var Activity = message.define('Activity', {
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
    content: {
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
    tableName: 'Activity',
    schema:'message'
});

module.exports = Activity;

/*var Image = require('./company-image.js');

Company.hasMany(Image, {
  as: 'images',
  foreignKey: 'related_id',
  constraints: false
});

var Contact = require('../user/contact.js');

Company.belongsTo(Contact, {
    as: 'owner',
    foreignKey: 'owner_id',
    constraints: false
});*/


Activity.sync();