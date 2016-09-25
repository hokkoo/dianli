var Sequelize = require('sequelize');
var company = require("../../config/sequelize").company;
// var r_cp = require("./company");

var Company_ex = company.define('Company_ex', {
    company_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: '商户名称不能为空'
            }
        }
    },
    short_name: Sequelize.STRING,
    com_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    major_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    tracer: Sequelize.STRING,
    service: {
        type:Sequelize.STRING,
        defaultValue: ''
    },
    region1: Sequelize.STRING,
    region2: Sequelize.STRING,
    region3: Sequelize.STRING,
    region4: Sequelize.STRING,
    region5: Sequelize.STRING,
    address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: '地址不能为空'
            }
        }
    },
    zige: Sequelize.STRING,
    telephone: Sequelize.STRING,
    contacts: Sequelize.STRING,
    contacts_mobile: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: '联系人电话不能为空'
            }
        }
    },
    code: Sequelize.STRING,
    xkdate: Sequelize.DATE,
    email: Sequelize.STRING,
    memo: Sequelize.TEXT,
    longtitude: {
        type: Sequelize.DECIMAL(18, 12),
        validate: {
            isDecimal: {
                args: true,
                msg: '经度格式错误'
            }
        }
    },

    latitude: {
        type: Sequelize.DECIMAL(18, 12),
        validate: {
            isDecimal: {
                args: true,
                msg: '纬度格式错误'
            }
        }
    },
    time_open: {
        type: Sequelize.STRING,
        defaultValue: '08:00:00'
    },
    time_closed: {
        type: Sequelize.STRING,
        defaultValue: '19:00:00'
    },
    create_time: {
        type: Sequelize.DATE
    },
    update_time: {
        type: Sequelize.DATE
    }
}, {
    tableName: 'company_ex',
    timestamps: false,
    schema : 'company'
});
/*Company_ex.hasOne(r_cp,{
    foreignKey: 'company_id',
    as : 'rCompany'
});*/
module.exports = Company_ex;
//Company_ex.sync();