var Sequelize = require('sequelize');
var user = require("../../config/sequelize").user;
var Role = user.define('Role', {
   role_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    role_name :{
        type :Sequelize.STRING
    },
    //权限，自关联，上下级
    super_role_id :{
        type: Sequelize.BIGINT(20)
    },
    //所对应的操作，操作列表，json数据
    operation :{
        type :Sequelize.STRING
    }
    //
}, {
    tableName: 'Role',
    schema:'user'
});

module.exports = Role;
//Role.sync();