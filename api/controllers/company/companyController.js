/**
    图库
 */

/*
    默认图库id为1, 若删除图库,则其图片默认都放到默认图库中;
 */

var _ = require('lodash');
var getAvailableFields = require('../util/util.js').getAvailableFields;
var _type = require('../../sequelize/config/constType.js');

module.exports = {
    list : function(req,res,next) {
        var Company = sails.sequelize['company.company'];
        var Image = sails.sequelize['company.company-image'];
        Company.findAll({
            include: [{
                model: Image,
                as: "images"
            }]
        }).then(function (data) {
            res.json({
                successed: true,
                data: data
            });
        });
    },
    find : function(req,res,next) {
        var Company = sails.sequelize['company.company'];
        var Image = sails.sequelize['company.company-image'];
        var Contact = sails.sequelize['user.contact'];
        var params = req.allParams(), where;
        if(params.id){
            Company.findOne({
                where: {id: params.id},
                include: [{
                    model: Image,
                    as: "images"
                },{
                    model: Contact,
                    as: "owner"
                }]
            }).then(function (data) {
                 res.json({
                    successed: true,
                    data: data
                });
            }).catch(function (error) {
                res.json({
                    successed: false,
                    message: error
                });
            });
        }else{
            res.json({
                successed: false,
                message: '无id'
            });
        }
    },
    delete : function(req,res,next) {
        var Company = sails.sequelize['company.company'];
        var params = req.allParams(), where;
        if(params.id){
            params.id = parseInt(params.id);
            var item = Company.build({id: params.id}, {isNewRecord: false, raw: true});
            item.destroy().then(function(){
                res.json({
                    successed: true,
                    data: params.id
                });
            }).catch(function (error) {
                res.json({
                    successed: false,
                    message: error
                });
            });
        }else{
            res.json({
                successed: false,
                message: '无id'
            });
        }
    },
    create: function(req,res,next) {
        var Company = sails.sequelize['company.company'];
        var params = req.allParams(), where;
        params = params.item || {};

        var keys = getAvailableFields(params);
        Company.create(params, {
            fields: keys
        }).then(function (item) {
            if(params.images && params.images.length){
                item.setImages(params.images);
            }
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
    edit: function(req,res,next) {
        var Company = sails.sequelize['company.company'];
        var params = req.allParams(), where;
        params = params.item || {};
        var keys = getAvailableFields(params);
        if(_.isUndefined(params.id)){
            res.json({
                successed: false,
                message: 'id为空'
            });
        }else{
            params.id = parseInt(params.id);
            var item = Company.build({id: params.id}, {isNewRecord: false, raw: true});
            var keys = getAvailableFields(params);
            item.update(params, {fields: keys}).then(function (rtn) {
                console.log('images ... ' + params.images)
                if(params.images && params.images.length){
                    try{
                        item.setImages(params.images).catch(function (e) {
                            console.log(e)
                        });
                        
                    }catch(e){
                        console.log(e)
                    }
                }
                res.json({
                    successed: true,
                    data: item
                })
            });
        }
    }
};

