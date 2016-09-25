var Sequelize = require('sequelize');
var company = require("../../config/sequelize").company;
// var Refund = require("./../payment/refund");


var Group_ticket = company.define('Group_ticket', {
    group_ticket_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    order_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false
    },
    payment_type: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    company_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false
    },
    product_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false
    },
    ticket_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    title: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    old_price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0
    },
    limit_begin: {
        type: Sequelize.DATE
    },
    limit_end: {
        type: Sequelize.DATE
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    refund_no: {
        type: Sequelize.BIGINT(20)
    },
    reserve_id: {
        type: Sequelize.BIGINT(20)
    },
    used_user_id: {
        type: Sequelize.BIGINT(20)
    },
    used_mechanic_id: {
        type: Sequelize.BIGINT(20)
    },
    used_time: {
        type: Sequelize.DATE
    },
    create_time: {
        type: Sequelize.DATE
    },
    update_time: {
        type: Sequelize.DATE
    },
    pay_id: {
        type: Sequelize.BIGINT(20)
    }
}, {
    tableName: 'group_ticket',
    timestamps: false,
    schema : 'company'
});


/*Group_ticket.belongsTo(Refund,{
    as : 'refund',
    foreignKey :'refund_no',
    schema : 'company'
})*/
module.exports = Group_ticket;
