/*
    客户
*/

module.exports = {
     attributes: {
        id: {
            type: 'bigtint',
            primaryKey: true
        },
        name: {
            type: 'string'
        },
        detail_id: {
            type: 'int'
        },
        address: {
            type: 'string'
        },
        tel: {
            type: 'string'
        },
        phone: {
            type: 'string'
        },
        image: {
            type: 'int'
        }
    },
    tableName: 'customer',
    connection: 'd_customer'
};