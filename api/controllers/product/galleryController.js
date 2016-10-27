/**
    图库
 */

/*
    默认图库id为1, 若删除图库,则其图片默认都放到默认图库中;
 */

var _ = require('lodash');
var getAvailableFields = require('../util/util.js').getAvailableFields;
var _type = require('../../sequelize/config/constType.js');

var defaultGalleryId = 1;

function findGalleryAndImage (id) {
    var Gallery = sails.sequelize['product.gallery'];
    var Image = sails.sequelize['product.gallery-image'];
    return new Promise(function (resolve, reject) {
        Gallery.findOne({
            where: {id: id},
            include: [{
                model: Image,
                as: "images"
            }]
        }).then(function (data) {
            resolve(data);
        }).catch(function (error) {
            resolve();
        });
    });
}

module.exports = {
    list : function(req,res,next) {
        var Gallery = sails.sequelize['product.gallery'];
        var Image = sails.sequelize['product.gallery-image'];
        var gallery = Gallery.build({id: 1});
        console.log(Object.keys(gallery));
        console.log(gallery.getImages);
        console.log(gallery.setImages);
        var params = req.allParams(), where;
        console.log(Image);
        Gallery.findAll({
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
        var params = req.allParams(), where;
        if(params.id){
            findGalleryAndImage(params.id).then(function (data) {
                res.json({
                    successed: true,
                    data: data
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
        //console.log(Object.keys(sails.sequelize));
        var Gallery = sails.sequelize['product.gallery'];
        var GalleryImage = sails.sequelize['product.gallery-image'];
        var params = req.allParams(), where;
        if(params.id){
            if(params.id == defaultGalleryId){
                return res.json({
                    successed: false,
                    message: '默认图库不能删除'
                });
            }
            findGalleryAndImage(params.id).then(function (item) {
                if(item){
                    item = item.get({plain: true});
                    var images = item.images;
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
                    _.each(images, function (image) {
                        GalleryImage.build({id: image.id}, {isNewRecord: false, raw: true}).update({related_id: defaultGalleryId},{
                            fields: ['related_id']
                        });
                    });
                }
            });
            var item = Gallery.build({id: params.id});
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
            })
        }else{
            res.json({
                successed: false,
                message: '无id'
            });
        }
    },
    create: function(req,res,next) {
        var Gallery = sails.sequelize['product.gallery'];
        var params = req.allParams(), where;
        params = params.item || {};
        var keys = getAvailableFields(params);
        Gallery.create(params, {
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
    edit: function(req,res,next) {
        var Gallery = sails.sequelize['product.gallery'];
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
            var item = Gallery.build({id: params.id}, {isNewRecord: false, raw: true});
            var keys = getAvailableFields(params);
            item.update(params, {fields: keys}).then(function (rtn) {
                res.json({
                    successed: true,
                    data: item
                })
            });
        }
    },
    images : function(req,res,next) {
        var Image = sails.sequelize['product.gallery-image'];
        var params = req.allParams(), where = {};
        var param = params.param || {};
        var galeryId = parseInt(param.galeryId);
        if(galeryId){
            where['related_id'] = galeryId
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
    addImage: function(req,res,next) {
        var Image = sails.sequelize['product.gallery-image'];
        var params = req.allParams(), where;
        params = params.item || {};
        params.type = _type.gallery.image;
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
        var Image = sails.sequelize['product.gallery-image'];
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
    },
    editImage: function(req,res,next) {
        var GalleryImage = sails.sequelize['product.gallery-image'];
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
            var item = GalleryImage.build({id: params.id}, {isNewRecord: false, raw: true});
            var keys = getAvailableFields(params);
            item.update(params, {fields: keys}).then(function (rtn) {
                res.json({
                    successed: true
                })
            });
        }
    }

};

