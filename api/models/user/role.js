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
        parent: {
            type: 'int',
            defaultsTo: 1
        }
    },
    tableName: 'role',
    connection: 'd_user'
};