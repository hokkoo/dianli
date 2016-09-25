var Sequelize = require('sequelize');
var misc = require("../../config/sequelize").misc;
var Car_brand = module.exports = misc.define('Car_brand', {
    brand_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    brand_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    series_id: Sequelize.INTEGER,
    series_name: {
        type: Sequelize.STRING
    },
    brand_init: {
        type: Sequelize.CHAR,
        allowNull: false
    },
    level :{
        type: Sequelize.INTEGER,
        defaultValue: 2
    },
    brand_country: Sequelize.STRING,
    img_name: Sequelize.STRING,
    brand_owner: Sequelize.STRING,
    hit_count: {
        type: Sequelize.BIGINT(20),
        defaultValue: 0
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    index: Sequelize.INTEGER,
    create_time: {
        type: Sequelize.DATE
    }
}, {
    tableName: 'car_brand',
    schema:'misc'
});
/*
Car_brand.hasMany(Car,{
    as : 'cars',
    foreignKey : 'car_id'
})
Car_brand.hasMany(Car_model,{
    as : 'models',
    foreignKey : 'brand_id'
})

Car_model.belongsTo(Car_brand,{
    as : 'brand',
    foreignKey :'brand_id'
})

Car_model.hasMany(Car,{
    as : 'cars',
    foreignKey : 'car_id'
})

Car.belongsTo(Car_brand,{
    as : 'brand',
    foreignKey :'brand_id'
})
Car.belongsTo(Car_model,{
    as : 'model',
    foreignKey :'model_id'
})*/