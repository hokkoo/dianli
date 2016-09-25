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
        category: {
            type: 'int'
        },
        // 父类
        parent: {
            type: 'int',
            defaultsTo: 3
        },
        createdAt: {
            type: 'datetime'
        },
        updatedAt: {
            type: 'datetime'
        }
    },
    tableName: 'ware',
    connection: 'd_product'
};