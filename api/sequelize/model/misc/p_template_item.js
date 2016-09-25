var Sequelize = require('sequelize');
var misc = require("../../config/sequelize").misc;

var P_template_item = module.exports = misc.define('P_template_item', {
    item_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    template_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.TEXT
    },
    index :{
        type: Sequelize.INTEGER
    },
    status: {
        type: Sequelize.INTEGER
    },
    create_time: {
        type: Sequelize.DATE
    },
    create_time: {
        type: Sequelize.DATE
    },
    memo: Sequelize.STRING
}, {
    tableName: 'p_template_item',
    timestamps: false,
    schema:'misc'
});
