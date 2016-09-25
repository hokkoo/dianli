var Sequelize = require('sequelize');
var company = require("../../config/sequelize").company;
// var Company_ex = require('./company_ex');

var Product = company.define('product', {
    product_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    company_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false
    },
    is_group: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 1
    },
    type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 0
    },
    title: {
        type: Sequelize.STRING,
        defaultValue: 0
    },
    content: {
        type: Sequelize.TEXT
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue : 0.00
    },
    total_price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue : 0.00
    },
    new_price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue : 0.00
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue : 0
    },
    ispublic: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 0
    },
    public_time: {
        type: Sequelize.DATE
    },
    create_time: {
        type: Sequelize.DATE
    },
    update_time: {
        type: Sequelize.DATE
    },
    reserve_pre_day: {
        type: Sequelize.INTEGER
    },
    memo :{
        type: Sequelize.TEXT
    },
    exception :{
        type: Sequelize.TEXT
    },
    begin_time: {
        type: Sequelize.DATE
    },
    end_time: {
        type: Sequelize.DATE
    },
    /*img1: {
        type: Sequelize.STRING
    },
    img2: {
        type: Sequelize.STRING
    },
    img3: {
        type: Sequelize.STRING
    },
    img4: {
        type: Sequelize.STRING
    },
    img5: {
        type: Sequelize.STRING
    },*/
    sell_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 0
    },
    group_capacity: {
        type: Sequelize.INTEGER,
        defaultValue : 0
    },
    limit_begin: {
        type: Sequelize.DATE
    },
    limit_end: {
        type: Sequelize.DATE
    },
    is_reserve: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 0
    },
    reserve_capacity: {
        type: Sequelize.INTEGER
    },
    reserve_limit: {
        type: Sequelize.STRING
    },
    reserve_limit2: {
        type: Sequelize.STRING
    },
    checked: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 1
    },
    checker: {
        type: Sequelize.STRING
    },
    check_time: {
        type: Sequelize.DATE
    }
}, {
    tableName: 'product',
    timestamps: false,
    schema: 'company'
});

/*
Company_ex.hasMany(Product,{
    as : 'products',
    foreignKey : 'company_id'
});
Product.belongsTo(Company_ex,{
    as : 'company',
    foreignKey :'company_id'
})
*/
module.exports = Product;