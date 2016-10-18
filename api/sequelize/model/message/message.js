var Sequelize = require('sequelize');
var message = require("../../config/sequelize").message;

// 联系人信息
var Message = message.define('Message', {
    id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    realName: {
        type: Sequelize.STRING
    },
    QQ: {
        type: Sequelize.STRING
    },
    companyName: {
        type: Sequelize.STRING
    },
    company_id: {
        type:Sequelize.BIGINT(20),
        defaultValue: 0
    },
    department: {
         type: Sequelize.STRING
    },
    // 法人
    // 都指向联系人
    contact_id: {
         type: Sequelize.BIGINT(20),
         defaultValue: 0
    },
    phone: {
        type: Sequelize.STRING
    },
    mobile: {
        type: Sequelize.STRING
    },
    email: {
         type: Sequelize.STRING
    },
    address: {
         type: Sequelize.STRING
    },
    location_id: {
         type: Sequelize.INTEGER,
        defaultValue: 0
    },
    geography_lon: {
         type: Sequelize.STRING
    },
    geography_lat: {
         type: Sequelize.STRING
    },
    desc: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.TEXT
    },
    image: {
        type: Sequelize.STRING
    },
    readed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    // 阅读的人
    readedUserId: {
        type:Sequelize.BIGINT(20),
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
    tableName: 'message',
    schema:'message'
});

module.exports = Message;

var Image = require('./message-image.js');

Message.hasMany(Image, {
  as: 'images',
  foreignKey: 'related_id',
  constraints: false
});


var Contact = require('../user/contact.js');

Message.belongsTo(Contact, {
    as: 'owner',
    foreignKey: 'contact_id',
    constraints: false
});

Message.sync();