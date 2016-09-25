var Sequelize = require('sequelize');
var user = require("../../config/sequelize").user;
//进货的退款信息

var User = user.define('User', {
    user_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    name :{
        type :Sequelize.STRING
    },
    title :{
        type :Sequelize.STRING
    },
    desc :{
        type :Sequelize.STRING
    },
    realname :{
        type :Sequelize.STRING
    },
    nickname:{
        type :Sequelize.STRING
    },
    tel :{
        type :Sequelize.STRING
    },
    contact :{
        type :Sequelize.STRING
    },
    address :{
        type :Sequelize.STRING
    },
    address_code :{
        type :Sequelize.STRING
    },
    role_id :{
        type :Sequelize.STRING
    },
    role :{
        type :Sequelize.STRING
    },
    sex :{
        type :Sequelize.STRING
    },
    age :{
        type :Sequelize.STRING
    },
    status :{
        type : Sequelize.INTEGER //0；关闭；1，正常；2，审批；3，黑名单；
    },
    //时间，ip，客户端类型
    last_login :{
        type :Sequelize.STRING
    },
    extra :{
        type :Sequelize.STRING
    }
}, {
    tableName: 'User',
    schema:'user'
});

module.exports = User;
//User.sync();