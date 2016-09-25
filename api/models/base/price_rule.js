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
            type: 'int'
        },
        properties: {
            type: 'string'
        }
    },
    tableName: 'product',
    connection: 'd_product'
};