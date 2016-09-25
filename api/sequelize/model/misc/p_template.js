var Sequelize = require('sequelize');
var misc = require("../../config/sequelize").misc;
/*var Company = require('../company/company_ex');
var P_template_process = require('./p_template_process');
var P_template_item = require('./p_template_item');
*/
var P_template = module.exports = misc.define('P_template', {
    template_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    is_public: {
        type: Sequelize.INTEGER
    },
    company_id: {
        type: Sequelize.BIGINT(20)
    },
    temp_name: {
        type: Sequelize.STRING
    },
    temp_content: {
        type: Sequelize.STRING
    },
    temp_special: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.INTEGER
    },
    business_id: {
        type: Sequelize.INTEGER
    },
    business :{
        type: Sequelize.STRING
    },
    sub_business_id: Sequelize.INTEGER,
    sub_business: Sequelize.STRING,
    create_time: {
        type: Sequelize.DATE
    }
}, {
    tableName: 'p_template',
    schema:'misc'
});

/*
P_template.belongsTo(Company,{
    as : 'company',
    foreignKey: 'company_id'
});
P_template.hasMany(P_template_item,{
    as : 'items',
    foreignKey : 'template_id'
});
P_template.hasMany(P_template_process,{
    as : 'processes',
    foreignKey : 'template_id'
});*/