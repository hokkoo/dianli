var Sequelize = require('sequelize');
var user = require("../../config/sequelize").user;
var User_log = user.define('User_log', {
    user_log_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    type :{
        type :Sequelize.INTEGER //类型，现与rel_table一样的值
    },
    rel_table :{
        type :Sequelize.INTEGER 
    },
    operation :{
        type :Sequelize.INTEGER  //操作：0，增加；1，减少；2，删除；3，新增；4，修改
    },
    //价格
    price :{
        type :Sequelize.INTEGER
    },
    //对应的快照
    user_snapshot :{
         type :Sequelize.INTEGER 
    },
    status : {
        type : Sequelize.INTEGER //状态：0，正常；1，发生退货；2，发生退款；3，召回
    },
    operator :{
        type :Sequelize.STRING
    },
    //当前登录用户
    user_id :{
        type :Sequelize.STRING
    },
    //额外信息，如IP地址；用户信息；此为快照，json格式。
    extra :{
        type :Sequelize.STRING
    }
}, {
    tableName: 'User_log',
    schema:'user'
});

module.exports = User_log;
//User_log.sync();