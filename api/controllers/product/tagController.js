/**
    产品
 */

var _ = require('lodash');
var getAvailableFields = require('../util/util.js').getAvailableFields;

module.exports = {
    list : function(req,res,next) {
        //console.log(Object.keys(sails.sequelize));
        var params = req.allParams(), where;
        if(params.type){
            where = {
                type: params.type
            }
        }
        var Tag = sails.sequelize['product.tag'];
        Tag.findAll(where).then(function (tags) {
            res.json({
                successed: true,
                data: tags
            });
        });

    },
    find : function(req,res,next) {
        //console.log(Object.keys(sails.sequelize));
        var Door = sails.sequelize['product.door'];
        var params = req.allParams(), where;
        if(params.id){
            Door.findById(params.id).then(function (rtn) {
                res.json({
                    successed: true,
                    data: rtn
                });
            });
            return
        }else{
            if(params.where){
                try{
                    where = JSON.parse(params.where);
                }catch(e){};
                if(where){
                    Door.findAll(where).then(function (rtn) {
                        res.json({
                            successed: true,
                            data: rtn
                        });
                    });
                    return;
                }
            }
        }
        res.json(null);

    },
    saves : function(req,res,next) {
        var Tag = sails.sequelize['product.tag'];
        var params = req.allParams(), where;
        var type = params.type = params.type || 0;
        var matched = {}, notMatched = {};
        var tags = params.tags || [];
        var promises = [];
        _.each(tags, function (tag) {
            var p = new Promise(function (resolve, reject) {
                var id = tag.id;
                delete tag.id;
                tag.type = type;
                console.log(tag);
                var keys = getAvailableFields(params);
                Tag.create(tag, {
                    fields: ['title', 'type']
                }).then(function (item) {
                    matched[id] = item.id;
                    console.log('####123 :' + item.id +' : ' + id);;
                    resolve();
                }).catch(function (error) {
                    notMatched[id] = error;
                    console.log('#ee');
                    console.log(error);
                    resolve();
                });
            });
            promises.push(p);
        });

        Promise.all(promises).then(function () {
            console.log('@#ssu');
            console.log(matched);
            res.json({
                successed: true,
                data: {
                    matched: matched,
                    notMatched: notMatched
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
        //console.log(Object.keys(sails.sequelize));
        var Door = sails.sequelize['product.door'];
        var params = req.allParams(), where;
        params = params.item || {};
        var keys = getAvailableFields(params);
        Door.create(params, {
            logging: true,
            fields: keys
        }).then(function (item) {
            console.log('####123');
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

