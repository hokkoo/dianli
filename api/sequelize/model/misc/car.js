var Sequelize = require('sequelize');
var misc = require("../../config/sequelize").misc;
var Car = module.exports = misc.define('Car', {
    car_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    brand_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false
    },
    model_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false
    },
    car_full_model: {
        type: Sequelize.STRING,
        allowNull: false
    },
    up_time: {
        type: Sequelize.STRING,
        allowNull: false
    },
    car_displacement: Sequelize.INTEGER,
    engine: Sequelize.STRING,
    gearbox: Sequelize.STRING,
    tech_owner: Sequelize.INTEGER,
    car_option: Sequelize.STRING,
    turbo: {
        type: Sequelize.INTEGER
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    update_time: {
        type: Sequelize.DATE
    },
    create_time: {
        type: Sequelize.DATE
    }
}, {
    tableName: 'cars',
    schema:'misc'
});

