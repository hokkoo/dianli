/**
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
    index : function(req,res,next) {
        var About = sails.sequelize['company.about'];
        var params = req.allParams(), where;
        About.findById(1).then(function (data) {
             res.json({
                successed: true,
                data: data
            });
        });
    },
    images : function(req,res,next) {
        var Image = sails.sequelize['company.company-image'];
        var params = req.allParams(), where = {};
        where['type'] = _type.about.image;
        var param = params.param || {};
        var companyId = parseInt(param.companyId);
        if(companyId){
            where['related_id'] = companyId;
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
        var About = sails.sequelize['company.about'];
        var params = req.allParams(), where;
        if(params.id){
            params.id = parseInt(params.id);
            var item = About.build({id: params.id}, {isNewRecord: false, raw: true});
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
        var About = sails.sequelize['company.about'];
        var params = req.allParams(), where;
        params = params.item || {};

        var keys = getAvailableFields(params);
        About.create(params, {
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
        var About = sails.sequelize['company.about'];
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
            var item = About.build({id: params.id}, {isNewRecord: false, raw: true});
            var keys = getAvailableFields(params);
            item.update(params, {fields: keys}).then(function (rtn) {
                console.log('images ... ' + params.images)
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

