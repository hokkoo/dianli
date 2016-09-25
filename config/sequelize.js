// 配置多数据库
var testhost ='yuanjingtest.mysql.rds.aliyuncs.com';
var host = 'yjclwdb1.mysql.rds.aliyuncs.com';
var curhost = testhost;
var Sequelize = require('sequelize');
var cls = require('continuation-local-storage');
Sequelize.cls = cls.createNamespace('yjclw-namespace');
var backend = new Sequelize('backend', 'yuanjingtwo', 'eH7oxs2TC6ZU', {
    'host':curhost,
    'dialectOptions':{
        'supportBigNumbers' : true,
        'bigNumberStrings' : true
    }
});
var carowner = new Sequelize('carowner', 'yuanjingtwo', 'eH7oxs2TC6ZU', {
    'host':curhost,
    'dialectOptions':{
        'supportBigNumbers' : true,
        'bigNumberStrings' : true
    }
});
var company = new Sequelize('company', 'yuanjingtwo', 'eH7oxs2TC6ZU', {
    'host': curhost,
    'dialectOptions':{
        'supportBigNumbers' : true,
        'bigNumberStrings' : true
    }
});
var misc = new Sequelize('misc', 'yuanjingtwo', 'eH7oxs2TC6ZU', {
    'host': curhost,
    'dialectOptions':{
        'supportBigNumbers' : true,
        'bigNumberStrings' : true
    }
});
var payment = new Sequelize('payment', 'yuanjingtwo', 'eH7oxs2TC6ZU', {
    'host':curhost,
    'dialectOptions':{
        'supportBigNumbers' : true,
        'bigNumberStrings' : true
    }
});
var mechanic = new Sequelize('mechanic', 'yuanjingtwo', 'eH7oxs2TC6ZU', {
    'host':curhost
});


module.exports = {
    loginAuth: {

    },
    loginAUthConfig: {
        connection: {
            'host':curhost,
            'user': 'yuanjingtwo',
            'password': 'eH7oxs2TC6ZU'
        },
        'database': 'backend'
    },
    backend: backend,
    carowner: carowner,
    company: company,
    misc: misc,
    payment: payment,
    mechanic : mechanic
}
