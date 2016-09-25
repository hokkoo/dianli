/**
    图片
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
        url: {
            type: 'string'
        },
        desc: {
            type: 'string'
        },
        extension: {
            type: 'string'
        },
        // 默认类型
        type: {
            type: 'int',
            defaultsTo: 0
        }
    },
    tableName: 'images',
    connection: 'd_product'
};