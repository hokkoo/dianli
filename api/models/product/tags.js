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
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: 'string'
        },
        type: {
            type: 'int',
            defaultsTo: 0
        }
    },
    tableName: 'tags',
    connection: 'd_product'
};