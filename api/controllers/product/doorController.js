/**
    产品
 */

var _ = require('lodash');
var getAvailableFields = require('../util/util.js').getAvailableFields;
var _type = require('../../sequelize/config/constType.js');

module.exports = {
    list : function(req,res,next) {
        //console.log(Object.keys(sails.sequelize));
        var Door = sails.sequelize['product.door'];
        var Images = sails.sequelize['product.images'];
        Door.findAll().then(function (rtn) {
            res.json(rtn);
        });

    },
    find : function(req,res,next) {
        //console.log(Object.keys(sails.sequelize));
        var Door = sails.sequelize['product.door'];
        var params = req.allParams(), where;
        if(params.id){
            Door.findById(params.id).then(function (rtn) {
                res.json(rtn);
            });
            return
        }else{
            if(params.where){
                try{
                    where = JSON.parse(params.where);
                }catch(e){};
                if(where){
                    Door.findAll(where).then(function (rtn) {
                        res.json(rtn);
                    });
                    return;
                }
            }
        }
        res.json(null);

    },
    create : function(req,res,next) {
        //console.log(Object.keys(sails.sequelize));
        var Door = sails.sequelize['product.door'];
        var Tag = sails.sequelize['product.tag'];
        var params = req.allParams(), where;
        params = params.item || {};
        var keys = getAvailableFields(params);
        Door.create(params, {
            logging: true,
            fields: keys
        }).then(function (item) {
            console.log('####123');
            // 保存标签信息
            _.each(params.tags, function (tagId) {
                Tag.findById(tagId).then(function (tag) {
                    tag.addProduct(item, {type: _type.door})
                });
            });
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
        //console.log(Object.keys(sails.sequelize));
        var Door = sails.sequelize['product.door'];
        var Tag = sails.sequelize['product.tag'];
        var params = req.allParams(), where;
        params = params.item || {};
        if(_.isUndefined(params.id)){
            res.json({
                successed: false,
                message: 'id为空'
            });
        }else{
            params.id = parseInt(params.id);
            // var _Door = require('../../sequelize/model/product/door.js');
            // Door.create({name: 'xx'}, {raw: true});
            var item = Door.build({id: params.id}, {isNewRecord: false, raw: true});
            var keys = getAvailableFields(params);
            console.log('######### dor edit')
            console.log(item.get({plain: true}))
            item.update(params, {fields: keys}).then(function (rtn) {
                console.log('@@@@end');
                res.json({
                    successed: true
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

