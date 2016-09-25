var Sequelize = require('sequelize');
var user = require("../../config/sequelize").user;
var Role_operation = user.define('Role_operation', {
   role_operation_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    operation_id :{
        type: Sequelize.BIGINT(20)
    },
    role_id :{
        type: Sequelize.BIGINT(20)
    }
    //
}, {
    tableName: 'Role_operation',
    schema:'user'
});

module.exports = Role_operation;
//Role_operation.sync();