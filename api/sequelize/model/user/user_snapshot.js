var Sequelize = require('sequelize');
var user = require("../../config/sequelize").user;
var User_snapshot = user.define('User_snapshot', {
    user_snapshot_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    type :{
        type :Sequelize.INTEGER //类型，现与rel_table一样的值
    },
    rel_table :{
        type :Sequelize.INTEGER 
    },
    detail :{
        type :Sequelize.INTEGER //快照，json格式
    },
    //额外信息，如IP地址；用户信息；此为快照，json格式。
    extra :{
        type :Sequelize.STRING
    }
}, {
    tableName: 'User_snapshot',
    schema:'user'
});

module.exports = User_snapshot;
//User_snapshot.sync();