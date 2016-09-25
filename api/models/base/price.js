/*
    价格
    多种价格组合
    1:
        原价
        最低价
        最高价
        均价


    TODO
        将价格作为可复用的
*/

module.exports = {
     attributes: {
        id: {
            type: 'bigtint',
            primaryKey: true
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
            type: 'int'
        }
    },
    tableName: 'price',
    connection: 'd_base'
};