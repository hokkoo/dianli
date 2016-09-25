var Sequelize = require('sequelize');
var company = require("../../config/sequelize").company;
console.log(__dirname);
var Company = company.define('Company', {
    company_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    admin_company_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false
    },
    admin_id: Sequelize.BIGINT(20),
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 1
    },
    coop: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 0
    },
    honest: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 0
    },
    checked: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 0
    },
    checker: Sequelize.STRING,
    create_time: {
        type: Sequelize.DATE
    },
    update_time: {
        type: Sequelize.DATE
    },
    last_login: Sequelize.DATE,
    frequency: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 0
    },
    star: {
        type: Sequelize.INTEGER,
        defaultValue : 0
    },
    normal_ticket: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 0
    },
    inspect_free: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 0
    },
    canWash: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 0
    },
    canMaintance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 0
    },
    canRepair: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 0
    },
    majors: Sequelize.TEXT,
    tags: Sequelize.TEXT,
    services: Sequelize.TEXT
}, {
    tableName: 'company',
    timestamps: false,
    schema:'company'
});

module.exports = Company;
console.log(__dirname);
//Company.sync();
