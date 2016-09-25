/*
    历史价格
    每一次修改的价格都会记录

    格式保持与price同步
*/

module.exports = {
     attributes: {
        id: {
            type: 'bigtint',
            primaryKey: true
        },
        value: {
            type: 'int'
        },
        min: {
            type: 'int'
        },
        max: {
            type: 'int'
        },
        average: {
            type: 'int'
        },
        type: {
            type: 'int',
            defaultsTo: 0
        },
        createdAt: {
            type: 'datetime'
        },
        updatedAt: {
            type: 'datetime'
        }
    },
    tableName: 'price_history',
    connection: 'd_history'
};