/*
    价格规则
    1，
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
        desc: {
            type: 'string'
        },
        content: {
            type: 'string'
        },
        headpic: {
            type: 'string'
        },
        priceinfo: {
            type: 'int',
            defaultsTo: 0
        },
        properties: {
            type: 'string'
        },
        createdAt: {
            type: 'datetime'
        },
        updatedAt: {
            type: 'datetime'
        }
    },
    tableName: 'price_rule',
    connection: 'd_base'
};