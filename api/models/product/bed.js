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
            defaultsTo: 2
        },
        images:{
            collection: 'images',
            via: 'product_id',
            through: 'product_images'
        }
    },
    tableName: 'bed',
    connection: 'd_product'
};