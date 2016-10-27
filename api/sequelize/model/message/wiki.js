var Sequelize = require('sequelize');
var message = require("../../config/sequelize").message;
var _type = require('../../config/constType');

var Wiki = message.define('Wiki', {
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
        type: Sequelize.TEXT
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
    tableName: 'wiki',
    schema:'message'
});

module.exports = Wiki;

Image = require('./message-image.js');

Wiki.hasMany(Image, {
  as: 'images',
  foreignKey: 'related_id',
  constraints: false,
  scope: {
    type: _type.message.wiki
  }
});


Wiki.sync();