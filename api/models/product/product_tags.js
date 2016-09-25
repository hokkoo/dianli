/**
 * Company_ex.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
     attributes: {
        product_id: {
            type: 'bigtint',
            primaryKey: true
        },
        tags_id: {
            type: 'bigtint',
            primaryKey: true
        }
    },
    tableName: 'product_tags',
    connection: 'd_product'
};