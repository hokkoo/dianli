var Sequelize = require('sequelize');
var user = require("../../config/sequelize").user;
var User_role = user.define('User_role', {
   User_role_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    user_id :{
        type: Sequelize.BIGINT(20)
    },
    role_id :{
        type: Sequelize.BIGINT(20)
    }

    //
}, {
    tableName: 'User_role',
    schema:'user'
});

module.exports = User_role;
//User_role.sync();