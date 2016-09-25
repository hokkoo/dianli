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
        nick: {
            type: 'string'
        },
        realName: {
            type: 'string'
        },
        phone: {
            type: 'string'
        },
        tel: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        address: {
            type: 'string'
        },
        location: {
            type: 'string'
        },
        location_code: {
            type: 'int'
        },
        detail_id: {
            type: 'int'
        },
        role: {
            type: 'int',
            defaultsTo: 1
        },

        // 父类
        parent: {
            type: 'int',
            defaultsTo: 2
        }
    },
    tableName: 'user',
    connection: 'd_user'
};