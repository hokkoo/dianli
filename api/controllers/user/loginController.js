/**
    登录
 */

var _ = require('lodash');
var getAvailableFields = require('../util/util.js').getAvailableFields;
var _type = require('../../sequelize/config/constType.js');
var crypto = require('crypto');

module.exports = {
    login : function(req,res,next) {
        var params = req.allParams(), where;
        params = params.item || {};
        console.log(params);
        var User = sails.sequelize['user.user'];
        User.findOne({
            where: {
                name: params.name
            }
        }).then(function(item) {
            if (item) {
                password = crypto.createHash('sha256').update(params.password).digest('hex');
                if (password === item.passport) {
                    item = item.get({plain: true});
                    req.logIn(item, function(){
                        res.json({
                            successed: true,
                            data: item
                        });
                    });
                } else {
                    res.json({
                        successed: false,
                        message: '密码错误'
                    });
                }
            } else {
                res.json({
                        successed: false,
                        message: '用户名错误'
                    });
            }
        });
    }
};

