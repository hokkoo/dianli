var Sequelize = require('sequelize');
var company = require("../../config/sequelize").company;

var CompanyDetail = company.define('CompanyDetail', {
    id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        autoIncrement: true
    },
    desc: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.TEXT
    },
    image: {
        type: Sequelize.STRING
    }
}, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    timestamps: true,
    paranoid: true,
    tableName: 'company_detail'
});

module.exports = CompanyDetail;

CompanyDetail.sync();