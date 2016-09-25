/**
    型号
    1，门
        尺寸
        颜色
        重量
        图案
        
    2，洁具
        尺寸

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
        // 类型，默认为0
        type: {
            type: 'int',
            defaultsTo: null
        }
    },
    tableName: 'model_type',
    connection: 'd_product'
};