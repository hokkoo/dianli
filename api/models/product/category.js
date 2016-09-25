/**
    类型
    0：门
    1：洁具
    2：床
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
        desc: {
            type: 'string'
        },
        type: {
            type: 'int',
            defaultsTo: 0
        }
    },
    tableName: 'category',
    connection: 'd_product'
};