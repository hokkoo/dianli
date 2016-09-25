var Sequelize = require('sequelize');
var misc = require("../../config/sequelize").misc;

var P_template_process = module.exports = misc.define('P_template_process', {
    process_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    template_id: {
        type: Sequelize.BIGINT(20)
    },
    process_name: {
        type: Sequelize.STRING
    },
    process_detail: {
        type: Sequelize.TEXT
    },
    type: {
        type: Sequelize.INTEGER
    },
    create_time: {
        type: Sequelize.DATE
    },
    idx: Sequelize.INTEGER
}, {
    tableName: 'p_template_process',
    schema:'misc'
});
