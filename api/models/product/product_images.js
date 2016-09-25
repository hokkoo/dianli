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
        images_id: {
            type: 'bigtint',
            primaryKey: true
        },
        type:{
            type: 'int',
            defaultsTo: 0
        }
    },
    tableName: 'product_images',
    connection: 'd_product'
};