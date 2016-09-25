/*
    历史图片
    每次给产品加图片，   其记录都会保留

*/

module.exports = {
     attributes: {
        id: {
            type: 'bigtint',
            primaryKey: true
        },
        product_id: {
            type: 'int'
        },
        image_id: {
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
    tableName: 'images_history',
    connection: 'd_history'
};