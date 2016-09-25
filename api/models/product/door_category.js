/**
    门类型
    父子类型
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
        // 父类型，默认为0
        parent: {
            type: 'int',
            defaultsTo: null
        }
    },
    tableName: 'door_category',
    connection: 'd_product'
};