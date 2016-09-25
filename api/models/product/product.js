/**
 * Company_ex.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
     attributes: {
        id: {
            type: 'bigtint',
            primaryKey: true
        },
        name: {
            type: 'string'
        },
        detail_id: {
            type: 'int'
        },
        desc: {
            type: 'string'
        },
        price: {
            type: 'int'
        },
        price_min: {
            type: 'int'
        },
        price_max: {
            type: 'int'
        },
        price_average: {
            type: 'int'
        },
        // 默认头像
        image: {
            type: 'string'
        }

    },
    tableName: 'product',
    connection: 'd_product'
};