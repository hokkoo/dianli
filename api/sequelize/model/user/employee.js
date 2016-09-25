var Sequelize = require('sequelize');
var user = require("../../config/sequelize").user;
var Employee = user.define('Employee', {
    employee_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    user_id :{
         type: Sequelize.BIGINT(20)
    }
    //
}, {
    tableName: 'Employee',
    schema:'user'
});

module.exports = Employee;
//Employee.sync();
