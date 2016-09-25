/**
    洁具
    
 */

module.exports = {
     attributes: {
        id: {
            type: 'bigtint',
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: 'string'
        },
        title: {
            type: 'string'
        },
        desc: {
            type: 'string'
        },
        image: {
            type: 'string'
        },
        category_id: {
            type: 'int'
        },
        price_id: {
            type: 'int'
        },
        // 父类
        parent_id: {
            type: 'int',
            defaultsTo: null
        },
        createdAt: {
            type: 'datetime'
        },
        updatedAt: {
            type: 'datetime'
        },
        images:{
            collection: 'product/images',
            columnName: 'refer_id'
        }
    },
    tableName: 'bed',
    connection: 'd_product'
};