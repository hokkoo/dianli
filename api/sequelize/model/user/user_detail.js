var Sequelize = require('sequelize');
var user = require("../../config/sequelize").user;
//进货的退款信息
var User_detail = user.define('User_detail', {
    user_detail_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    user_id :{
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    interest :{
        type :Sequelize.STRING
    },
    //用户的统计信息，简易
    statitic :{
       type :Sequelize.STRING
   }

    
}, {
    tableName: 'User_detail',
    schema:'user'
});

module.exports = User_detail;
//User_detail.sync();