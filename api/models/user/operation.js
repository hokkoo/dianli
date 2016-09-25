/**
    洁具
    
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
        url: {
            type: 'string'
        }
    },
    tableName: 'operation',
    connection: 'd_user'
};