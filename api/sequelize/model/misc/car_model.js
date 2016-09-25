var Sequelize = require('sequelize');
var misc = require("../../config/sequelize").misc;


var Car_model = module.exports = misc.define('Car_model', {
    model_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    brand_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false
    },
    model_tag: {
        type: Sequelize.STRING
    },
    model_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    car_type: {
        type: Sequelize.STRING
    },
    grade: {
        type: Sequelize.INTEGER
    },
    level: {
        type: Sequelize.INTEGER
    },
    tech_owner:  {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    memo: Sequelize.TEXT,
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    create_time: {
        type: Sequelize.DATE
    }
}, {
    tableName: 'car_model',
    schema:'misc'
});

