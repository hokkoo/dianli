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
        location: {
            type: 'string'
        },
        tel: {
            type: 'string'
        },
        phone: {
            type: 'string'
        },
        image: {
            type: 'string'
        },
        createdAt: {
            type: 'datetime'
        },
        updatedAt: {
            type: 'datetime'
        }
    },
    tableName: 'customer',
    connection: 'd_customer'
};