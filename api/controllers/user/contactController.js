/**
    产品
 */

var _ = require('lodash');
var getAvailableFields = require('../util/util.js').getAvailableFields;
var _type = require('../../sequelize/config/constType.js');

module.exports = {
    list : function(req,res,next) {
        var Contact = sails.sequelize['user.contact'];
        Contact.findAll({
        }).then(function (doors) {
            res.json({
                successed: true,
                data: doors
            });
        });
    },
    find : function(req,res,next) {
        var Contact = sails.sequelize['user.contact'];
        var Image = sails.sequelize['product.image'];
        var params = req.allParams(), where;
        if(params.id){
            Contact.findOne({
                where: {
                    id: params.id
                }
            }).then(function (door) {
                res.json({
                    successed: true,
                    data: door
                });
            });
        }else{
            if(params.where){
                try{
                    where = JSON.parse(params.where);
                }catch(e){};
                if(where){
                    Contact.findAll(where).then(function (doors) {
                        res.json({
                            successed: true,
                            data: doors
                        });
                    });
                }
            }else{
                res.json({
                    successed: false,
                    message: '请提供查询条件'
                })
            }
        }
    },
    creates : function(req,res,next) {
        //console.log(Object.keys(sails.sequelize));
        var Contact = sails.sequelize['user.contact'];
        var params = req.allParams(), where;
        var contacts = params.contacts || [];
        var promises = [], notMatched = {};
        var saved = [];
        _.each(contacts, function (contact) {
            var p = new Promise(function (resolve, reject) {
                var keys = getAvailableFields(tag);
                Contact.create(contact, {
                    fields: keys
                }).then(function (item) {
                    saved.push(item.get({plain: true}));
                    resolve();
                }).catch(function (error) {
                    notMatched[id] = error;
                    console.log(error);
                    resolve();
                });
            });
            promises.push(p);
        });
        Promise.all(promises).then(function () {
            res.json({
                successed: true,
                data: {
                    notMatched: notMatched,
                    contacts: saved
                }
            })
        }).catch(function (error) {
            res.json({
                successed: false,
                data: {
                    notMatched: notMatched
                }
            })
        });
    },
    create : function(req,res,next) {
        //console.log(Object.keys(sails.sequelize));
        var Contact = sails.sequelize['user.contact'];
        var params = req.allParams(), where;
        params = params.item || {};
        var keys = getAvailableFields(params);
        Contact.create(params, {
            fields: keys
        }).then(function (item) {
            res.json({
                successed: true,
                data: item
            })
        }).catch(function (error) {
            res.json({
                successed: false,
                message: error
            })
        });
    },
    edit : function(req,res,next) {
        var Contact = sails.sequelize['user.contact'];
        var params = req.allParams(), where;
        params = params.item || {};
        if(_.isUndefined(params.id)){
            res.json({
                successed: false,
                message: 'id为空'
            });
        }else{
            params.id = parseInt(params.id);
            var item = Contact.build({id: params.id}, {isNewRecord: false, raw: true});
            var keys = getAvailableFields(params);
            item.update(params, {fields: keys}).then(function (rtn) {
                res.json({
                    successed: true,
                    data: rtn
                })
            }).catch(function (error) {
                res.json({
                    successed: false,
                    message: error
                })
            })
        }
    }
};

