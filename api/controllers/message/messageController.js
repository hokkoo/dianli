/**
    留言信息
 */

var _ = require('lodash');
var getAvailableFields = require('../util/util.js').getAvailableFields;
var _type = require('../../sequelize/config/constType.js');

module.exports = {
    list : function(req,res,next) {
        var Message = sails.sequelize['message.message'];
        var params = req.allParams(), where = {};
        var param = params.param || {};
        Message.findAndCount({
            where: where,
            limit: params.take,
            offset: params.start
        }).then(function (data) {
            res.json({
                successed: true,
                data: data.rows,
                total: data.count
            });
        });
    },
    read: function(req,res,next) {
        var Message = sails.sequelize['message.message'];
        var params = req.allParams(), where;
        params = params.item || {};
        var keys = getAvailableFields(params);
        if(_.isUndefined(params.id) || _.isArray(params.ids)){
            res.json({
                successed: false,
                message: 'id为空'
            });
        }else if(params.id){
            params.id = parseInt(params.id);
            var item = Message.build({id: params.id}, {isNewRecord: false, raw: true});
            item.update({readed: true}, {fields: ['readed']}).then(function (rtn) {
                res.json({
                    successed: true,
                    data: item
                })
            });
        }else if(_.isArray(params.ids)){
            Message.update({
                readed: true
            }, {
                where: {
                    id: {
                        $in: params.ids
                    }
                }
            }).spread(function (affectedCount, affectedRows) {
                res.json({
                    successed: true,
                    data: {
                        affectedCount: affectedCount,
                        affectedRows: affectedRows
                    }
                });
            });
        }
    },
    images : function(req,res,next) {
        var Image = sails.sequelize['company.company-image'];
        var params = req.allParams(), where = {};
        where['type'] = _type.about.image;
        var param = params.param || {};
        var company_id = parseInt(param.company_id);
        if(company_id){
            where['related_id'] = company_id;
        }

        Image.findAndCount({
            where: where,
            limit: params.take,
            offset: params.start
        }).then(function (data) {
            res.json({
                successed: true,
                data: data.rows,
                total: data.count
            });
        });
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
        var Message = sails.sequelize['message.message'];
        var params = req.allParams(), where;
        params = params.item || {};

        var keys = getAvailableFields(params);
        Message.create(params, {
            fields: keys
        }).then(function (item) {
            if(params.images && params.images.length){
                item.setImages(params.images);
            }
            res.json({
                successed: true,
                data: item
            });
        }).catch(function (error) {
            res.json({
                successed: false,
                message: error
            })
        });
    },
    edit: function(req,res,next) {
        var Message = sails.sequelize['message.message'];
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
            var item = Message.build({id: params.id}, {isNewRecord: false, raw: true});
            var keys = getAvailableFields(params);
            item.update(params, {fields: keys}).then(function (rtn) {
                if(params.images && params.images.length){
                    item.setImages(params.images);
                }
                res.json({
                    successed: true,
                    data: item
                })
            });
        }
    }
};

