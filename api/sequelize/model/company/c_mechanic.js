var Sequelize = require('sequelize');
var company = require("../../config/sequelize").company;
console.log(__dirname);
var C_mechanic = company.define('C_mechanic', {
    company_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    mechanic_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    group_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: '名称不能为空'
            }
        }
    },
    operatingpost: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mobile: {
        type: Sequelize.STRING,
        allowNull: false
    },
    push_message: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    pwd: Sequelize.STRING,
    in_date: Sequelize.DATE,
    out_date: Sequelize.DATE,
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    memo: Sequelize.TEXT,
    create_time: {
        type: Sequelize.DATE
    },
    update_time: {
        type: Sequelize.DATE
    }
}, {
    tableName: 'c_mechanic',
    timestamps: false,
    schema:'company'
});
console.log(__dirname);
module.exports = C_mechanic;
//C_mechanic.sync();