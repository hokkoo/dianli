var Sequelize = require('sequelize');
var user = require("../../config/sequelize").user;

var Operation = user.define('Operation', {
   operation_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    Operation_name :{
        type :Sequelize.STRING
    },
    //权限，自关联，上下级
    super_operation_id :{
        type: Sequelize.BIGINT(20)
    },
    url :{
        type :Sequelize.STRING
    },
    extra :{
        type :Sequelize.STRING
    }

    //
}, {
    tableName: 'Operation',
    schema:'user'
});

module.exports = Operation;
//Operation.sync();