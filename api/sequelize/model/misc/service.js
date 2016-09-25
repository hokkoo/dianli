var Sequelize = require('sequelize');
var misc = require("../../config/sequelize").misc;


var Service = module.exports = misc.define('Service', {
    service_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    service_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tag: Sequelize.CHAR,
    memo: Sequelize.TEXT,
    index: Sequelize.INTEGER,
    create_time: {
        type: Sequelize.DATE
    }
}, {
    tableName: 'service',
    schema:'misc'
});
