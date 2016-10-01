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

        var Tag = sails.sequelize['product.tag'];
        var door = Door.build({id:1});
        var tag = Tag.build({id: 1});
        console.log('##21')
        console.log(door.setTags)
        console.log(door.getTags)
        console.log(door.addTag)
        console.log(door.addTags)
        console.log(tag.setProducts)
        console.log(tag.getProducts)
        console.log(tag.addProduct)
        console.log(tag.addProducts)

    },
    find : function(req,res,next) {
        //console.log(Object.keys(sails.sequelize));
        var Door = sails.sequelize['product.door'];
        var Tag = sails.sequelize['product.tag'];
        var Category = sails.sequelize['product.category'];
        console.log('@@####12')
        var category = Category.build({id: 1});
        console.log(category.getDoors);
        console.log(category.setDoors);
        console.log(category.addDoor);
        console.log(category.addDoors);
        var door = Door.build({id: 2});
        console.log(door.getCategory)
        console.log(door.setCategory)
        var params = req.allParams(), where;
        if(params.id){
            Door.findOne({
                where: {
                    id: params.id
                },
                include: [
                    // {model: Category, as: 'category'},
                    {model: Tag, as: 'tags'}
                ]
            },{
                logging: true
            }).then(function (rtn) {
                res.json(rtn);
            });
/*            Door.scope('tags').findById(params.id).then(function (rtn) {
                res.json(rtn);
            });*/
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
        var Category = sails.sequelize['product.category'];
        var params = req.allParams(), where;
        params = params.item || {};
        var keys = getAvailableFields(params);
        Door.create(params, {
            logging: true,
            fields: keys
        }).then(function (item) {
            console.log('####123');
            // 保存标签信息
            if(params.tags && params.tags.length){
                item.addTags(params.tags || []);
            }
          /*  _.each(params.tags, function (tagId) {
                Tag.findById(tagId).then(function (tag) {
                    tag.addProduct(item, {type: _type.door})
                });
            });*/
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
            var item = Door.build({id: params.id}, {isNewRecord: false, raw: true});
            delete params.detail_id;
            delete params.parent_id;
            var keys = getAvailableFields(params);
            console.log(keys)
            item.update(params, {fields: keys}).then(function (rtn) {
                console.log('@@@@end');
                item.setTags([]).then(() => {
                    console.log('######################')
                    if(params.tags && params.tags.length){
                        item.setTags(params.tags);
                    }
                });
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

