var Sequelize = require('sequelize');
var company = require("../../config/sequelize").company;

var Limits = company.define('Limits', {
    company_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    all_day: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 50
    },
    all_hour: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 10
    },
    wash_day: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 20
    },
    wash_hour: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 10
    },
    repair_day: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 20
    },
    repair_hour: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 10
    },
    mt_day: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 20
    },
    mt_hour: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 10
    },
    test_day: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 20
    },
    test_hour: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 10
    }
}, {
    tableName: 'limits',
    timestamps: false,
    schema:'company'
});

module.exports = Limits;