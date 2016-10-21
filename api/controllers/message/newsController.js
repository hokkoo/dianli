/**
    留言信息
 */

var _ = require('lodash');
var getAvailableFields = require('../util/util.js').getAvailableFields;
var _type = require('../../sequelize/config/constType.js');

module.exports = {
    list : function(req,res,next) {
        var News = sails.sequelize['message.news'];
        var params = req.allParams(), where = {};
        var param = params.param || {};
        News.findAndCount({
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
    find : function(req,res,next) {
        var News = sails.sequelize['message.news'];
        var Image = sails.sequelize['message.message-image'];
        var params = req.allParams(), where;
        if(!params.id){
            return res.json({
                successed: false,
                message: 'id为空'
            });
        }
        News.findById(params.id, {
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
    images : function(req,res,next) {
        var Image = sails.sequelize['message.message-image'];
        var params = req.allParams(), where = {};
        where['type'] = _type.message.news;
        var param = params.param || {};
        var relatedId = parseInt(param.relatedId);
        if(relatedId){
            where['related_id'] = relatedId;
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
        var News = sails.sequelize['message.news'];
        var params = req.allParams(), where;
        if(params.id){
            params.id = parseInt(params.id);
            var item = News.build({id: params.id}, {isNewRecord: false, raw: true});
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
        var News = sails.sequelize['message.news'];
        var params = req.allParams(), where;
        params = params.item || {};

        var keys = getAvailableFields(params);
        News.create(params, {
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
        var News = sails.sequelize['message.news'];
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
            var item = News.build({id: params.id}, {isNewRecord: false, raw: true});
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
    },
    addImage: function(req,res,next) {
        var Image = sails.sequelize['message.message-image'];
        var params = req.allParams(), where;
        params = params.item || {};
        params.type = _type.message.news;
        if(_.isUndefined(params.id) || _.isUndefined(params.related_id)){
            res.json({
                successed: false,
                message: 'id为空'
            });
        }else{
            params.id = parseInt(params.id);
            var item = Image.build({id: params.id}, {isNewRecord: false, raw: true});
            item.update({related_id: params.related_id}).then(function (rtn) {
                res.json({
                    successed: true,
                    data: item
                })
            });
        }
    },
    deleteImage: function(req,res,next) {
        var Image = sails.sequelize['message.message-image'];
        var params = req.allParams(), where;
        params = params.item || {};
        if(_.isUndefined(params.id) || _.isUndefined(params.related_id)){
            res.json({
                successed: false,
                message: 'id为空'
            });
        }else{
            params.id = parseInt(params.id);
            var item = Image.build({id: params.id}, {isNewRecord: false, raw: true});
            item.update({related_id: 0}).then(function (rtn) {
                res.json({
                    successed: true,
                    data: item
                })
            });
        }
    }
};

