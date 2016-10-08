/**
    产品
 */

var _ = require('lodash');
var getAvailableFields = require('../util/util.js').getAvailableFields;
var _type = require('../../sequelize/config/constType.js');

module.exports = {
    list : function(req,res,next) {
        var Category = sails.sequelize['product.category'];
        var params = req.allParams(), where;
        var type = params.type;
        if(type){
        	Category.findAll({where: {type: type}}).then(function (categorys) {
        		res.json({
	        		successed: true,
	        		data: categorys
	        	});
        	})
        }else{
        	res.json({
        		successed: false
        	});
        }
    },
    find : function(req,res,next) {
        //console.log(Object.keys(sails.sequelize));
        var Category = sails.sequelize['product.category'];
        var params = req.allParams(), where;
        var type = params.type;
        if(type){
        	Category.findAll({where: {type: type}}).then(function (categorys) {
        		res.json({
	        		successed: true,
	        		data: categorys
	        	});
        	})
        }else{
        	res.json({
        		successed: false
        	});
        }
    },
    creates : function(req,res,next) {
        var Category = sails.sequelize['product.category'];
        var params = req.allParams(), where;
        var categorys = params.categorys || [];
        var notMatched = [];
        var promises = [];
        var saved = [];
        _.each(categorys, function (category) {
            var p = new Promise(function (resolve, reject) {
                var keys = getAvailableFields(category);
                Category.create(category, {
                    fields: keys
                }).then(function (item) {
                    saved.push(item.get({plain: true}));
                    resolve();
                }).catch(function (error) {
                    notMatched.push(error);
                    console.log('#ee');
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
                    categorys: saved
                }
            })
        }).catch(function (error) {
            res.json({
                successed: false,
                data: {
                    matched: matched,
                    notMatched: notMatched
                }
            })
        });
    },
    create : function(req,res,next) {
        var Category = sails.sequelize['product.category'];
        var params = req.allParams(), where;
        params = params.item || {};
        var _id = params.id;
        delete params.id;
        var keys = getAvailableFields(params);
        Category.create(params, {
            fields: keys
        }).then(function (item) {
          	  if(_id){
              item[_id] = item.id;
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
    edit : function(req,res,next) {
        //console.log(Object.keys(sails.sequelize));
        var Category = sails.sequelize['product.category'];
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
            var item = Category.build({id: params.id}, {isNewRecord: false, raw: true});
            delete params.detail_id;
            delete params.parent_id;
            var keys = getAvailableFields(params);
            item.update(params, {fields: keys}).then(function (item) {
                res.json({
                    successed: true,
                    data: item
                });
            }).catch(function (error) {
                res.json({
                    successed: false,
                    message: error
                })
            })
        }
    }
};

