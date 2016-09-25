var Sequelize = require('sequelize');
var company = require("../../config/sequelize").company;
console.log(__dirname);
var Company_img = company.define('Company_img', {
    img_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    main_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pic_type: {
        type: Sequelize.INTEGER,
        defaultValue: 2
    },
    memo: {
        type: Sequelize.TEXT
    },
    create_time: {
        type: Sequelize.DATE
    },
    update_time: {
        type: Sequelize.DATE
    }
}, {
    tableName: 'company_img',
    timestamps: false,
    schema:'company'
});
console.log(__dirname);
module.exports = Company_img;
//Company_img.sync();