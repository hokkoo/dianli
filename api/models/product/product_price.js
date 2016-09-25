/**
    产品价格表
 */

module.exports = {
     attributes: {
        product_id: {
            type: 'bigtint',
            primaryKey: true
        },
        price_id: {
            type: 'bigtint',
            primaryKey: true
        },
        createdAt: {
            type: 'datetime'
        },
        updatedAt: {
            type: 'datetime'
        }
    },
    tableName: 'product_price',
    connection: 'd_product'
};