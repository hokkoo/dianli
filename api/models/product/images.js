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
        // 关联id，代表图片来源于哪里
        related_id: {
            type: 'int',
            defaultsTo: null
        },
        // 默认类型
        type: {
            type: 'int',
            defaultsTo: 1
        },
        createdAt: {
            type: 'datetime'
        },
        updatedAt: {
            type: 'datetime'
        }
    },
    tableName: 'images',
    connection: 'd_product'
};