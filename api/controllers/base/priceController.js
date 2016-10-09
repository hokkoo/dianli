/**
    产品
 */

var _ = require('lodash');
var getAvailableFields = require('../util/util.js').getAvailableFields;
var _type = require('../../sequelize/config/constType.js');

module.exports = {
    createPriceRule : function(req,res,next) {
        //console.log(Object.keys(sails.sequelize));
        var PriceRule = sails.sequelize['base.price-rule'];
        var params = req.allParams(), where;
        params = params.item || {};
        var keys = getAvailableFields(params);
        PriceRule.create(params, {
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
    savePriceRule : function(req,res,next) {
        //console.log(Object.keys(sails.sequelize));
        var PriceRule = sails.sequelize['base.price-rule'];
        var params = req.allParams(), where;
        params = params.item || {};
        var keys = getAvailableFields(params);
        params.id = parseInt(params.id);
        var item = PriceRule.build({id: params.id}, {isNewRecord: false, raw: true});
        item.update(params, {fields: keys}).then(function (item) {
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
    deletePriceRule : function(req,res,next) {
        //console.log(Object.keys(sails.sequelize));
        var PriceRule = sails.sequelize['base.price-rule'];
        var params = req.allParams(), where;
        params.id = parseInt(params.id);
        var item = PriceRule.build({id: params.id}, {isNewRecord: false, raw: true});
        var keys = getAvailableFields(params);
        params.id = parseInt(params.id);
        var item = PriceRule.build({id: params.id}, {isNewRecord: false, raw: true});
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
    },
    createPrice : function(req,res,next) {
        //console.log(Object.keys(sails.sequelize));
        var Price = sails.sequelize['base.price'];
        var params = req.allParams(), where;
        params = params.item || {};
        delete params.id;
        var keys = getAvailableFields(params);
        Price.create(params, {
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
    savePrice : function(req,res,next) {
        //console.log(Object.keys(sails.sequelize));
        var Price = sails.sequelize['base.price'];
        var params = req.allParams(), where;
        params = params.item || {};
        var keys = getAvailableFields(params);
        params.id = parseInt(params.id);
        var item = Price.build({id: params.id}, {isNewRecord: false, raw: true});
        item.update(params, {fields: keys}).then(function (item) {
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
  
};

