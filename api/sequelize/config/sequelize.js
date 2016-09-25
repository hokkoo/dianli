// 配置多数据库
var testhost = 'yuanjingtest.mysql.rds.aliyuncs.com';
var host = 'yjclwdb1.mysql.rds.aliyuncs.com';
var localhost = {
    host: 'localhost',
    user: 'tony',
    pwd: 'abcd1234'
}
var curhost = localhost;
var Sequelize = require('sequelize');
var cls = require('continuation-local-storage');
Sequelize.cls = cls.createNamespace('yjclw-namespace');
var company = new Sequelize('company', curhost.user, curhost.pwd, {
    'host': curhost.host,
    'dialectOptions': {
        'supportBigNumbers': true,
        'bigNumberStrings': true
    }
});
var logs = new Sequelize('logs', curhost.user, curhost.pwd, {
    'host': curhost.host,
    'dialectOptions': {
        'supportBigNumbers': true,
        'bigNumberStrings': true
    }
});
var misc = new Sequelize('misc', curhost.user, curhost.pwd, {
    'host': curhost.host,
    'dialectOptions': {
        'supportBigNumbers': true,
        'bigNumberStrings': true
    }
});
var product = new Sequelize('product', curhost.user, curhost.pwd, {
    'host': curhost.host,
    'dialectOptions': {
        'supportBigNumbers': true,
        'bigNumberStrings': true
    }
});
var trade = new Sequelize('trade', curhost.user, curhost.pwd, {
    'host': curhost.host,
    'dialectOptions': {
        'supportBigNumbers': true,
        'bigNumberStrings': true
    }
});
var user = new Sequelize('user', curhost.user, curhost.pwd, {
    'host': curhost.host,
    'dialectOptions': {
        'supportBigNumbers': true,
        'bigNumberStrings': true
    }
});
/*var mechanic = new Sequelize('mechanic', curhost.user, curhost.pwd, {
    'host': curhost.host
});*/


module.exports = {
    loginAuth: {

    },
    loginAUthConfig: {
        connection: {
            'host': curhost.host,
            'user': curhost.user,
            'password': curhost.pwd
        },
        'database': 'user'
    },
    company: company,
    logs: logs,
    misc: misc,
    product: product,
    trade: trade,
    user: user
}