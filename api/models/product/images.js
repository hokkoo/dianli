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
        size: {
            type: 'int',
            defaultsTo: 0
        },
        // 关联id，代表图片来源于哪里
        // 特定于图片之间的复制
        refer_id: {
            type: 'int',
            defaultsTo: null
        },
        // 外部引用的id
        // 所有图片都单独对应于一个外部引用
        related_id: {
            type: 'int',
            foreignKey: true,
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