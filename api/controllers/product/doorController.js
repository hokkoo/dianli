/**
    产品
 */

var _ = require('lodash');
var getAvailableFields = require('../util/util.js').getAvailableFields;
var _type = require('../../sequelize/config/constType.js');

module.exports = {
    list : function(req,res,next) {
        var Door = sails.sequelize['product.door'];
        var Image = sails.sequelize['product.image'];
        var params = req.allParams(), where = {};
        var param = params.param, availableIds = [];
         var promises = [], p;
        if(param){
            if(param.keyword){
                var likeQ = '%' + param.keyword + '%';
                where['$or'] = [
                    {
                        name: {
                            $like: likeQ
                        }
                    },
                    {
                        title: {
                            $like: likeQ
                        }
                    },
                    {
                        desc: {
                            $like: likeQ
                        }
                    },
                    {
                        content: {
                            $like: likeQ
                        }
                    }
                ]
            }
            if(param.tags && param.tags.length){
                // TODO: through table 的 where inner join
                p = new Promise(function (resolve, reject) {
                    var ProductTag = sails.sequelize['product.product_tag'];
                    ProductTag.findAll({
                        where: {
                            tag_id: {
                                $in: param.tags
                            }
                        }
                    }).then(function (list) {
                        availableIds = availableIds.concat(_.map(list, function (item) {
                            return item.product_id;
                        }));
                        resolve(availableIds);
                    })
                });
                promises.push(p);
            }
            if(param.categorys && param.categorys.length){
                p = new Promise(function (resolve, reject) {
                    var ProductCategory = sails.sequelize['product.product_category'];
                    ProductCategory.findAll({
                        where: {
                            category_id: {
                                $in: param.categorys
                            }
                        }
                    }).then(function (list) {
                        availableIds = availableIds.concat(_.map(list, function (item) {
                            return item.product_id;
                        }));
                        resolve(availableIds);
                    })
                });
                promises.push(p);
            }
        }
        Promise.all(promises).then(function () {
            availableIds = _.uniq(availableIds);
            console.log(availableIds);
            if(availableIds && availableIds.length){
                where['id'] = {
                    $in: availableIds
                }
            }
            Door.findAndCount({
                where: where,
                limit: params.take,
                offset: params.start,
                include: [{
                    model: Image,
                    as: "images"
                }]
            }).then(function (data) {
                res.json({
                    successed: true,
                    data: data.rows,
                    total: data.count
                });
            });
        });

        var Tag = sails.sequelize['product.tag'];
        var door = Door.build({id:1});
        var tag = Tag.build({id: 1});
        // console.log('##21')
        // console.log(door.setImages)
        // console.log(door.getImages)
        // console.log(door.addImage)
        // console.log(door.addImages)
        /*console.log(door.setTags)
        console.log(door.getTags)
        console.log(door.addTag)
        console.log(door.addTags)
        console.log(tag.setProducts)
        console.log(tag.getProducts)
        console.log(tag.addProduct)
        console.log(tag.addProducts)*/
        // console.log(door.setCategorys)
        // console.log(door.getCategorys)
        // console.log(door.addCategory)
        // console.log(door.addCategorys)

    },
    find : function(req,res,next) {
        //console.log(Object.keys(sails.sequelize));
        var Door = sails.sequelize['product.door'];
        var Tag = sails.sequelize['product.tag'];
        var Category = sails.sequelize['product.category'];
        var Image = sails.sequelize['product.image'];
        var Price = sails.sequelize['product.price'];
        var PriceRule = sails.sequelize['product.price_rule'];
        // var category = Category.build({id: 1});
        // var door = Door.build({id: 2});
        // console.log(category.getDoors);
        // console.log(category.setDoors);
        // console.log(category.addDoor);
        // console.log(category.addDoors);
        // console.log(door.getCategory)
        // console.log(door.setCategory)
        var params = req.allParams(), where;
        if(params.id){
            Door.findOne({
                where: {
                    id: params.id
                },
                include: [
                    // {model: Category, as: 'category'},
                    {model: Image, as: 'images'},
                    {model: Tag, as: 'tags'},
                    {model: Category, as: 'categorys'},
                    {model: Price, as: 'price', include: [{model: PriceRule, as: 'rules'}]}
                ]
            },{
                logging: true
            }).then(function (door) {
                res.json({
                    successed: true,
                    data: door
                });
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
                    Door.findAll(where).then(function (doors) {
                        res.json({
                            successed: true,
                            data: doors
                        });
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
        var Image = sails.sequelize['product.image'];
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
            if(params.images && params.images.length){
                console.log(444);
                var related_id = item.id;
                _.each(params.images, function (image) {
                    delete image.id;
                    image.related_id = related_id;
                    Image.create(image);
                });
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
        var Image = sails.sequelize['product.image'];
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
                item.setImages([]).then( () => {
                    if(params.images && params.images.length){
                        console.log(444);
                        var related_id = item.id;
                        _.each(params.images, function (image) {
                            delete image.id;
                            image.related_id = related_id;
                            Image.create(image);
                        });
                    }
                });
                    
                item.setTags([]).then(() => {
                    console.log('######################')
                    if(params.tags && params.tags.length){
                        item.setTags(params.tags)
                    }
                });

                // 保存分类
                console.log('####ct')
                console.log(params.categorys);
                try{
                    item.setCategorys([]).then(() => {
                        if(params.categorys && params.categorys.length){
                            item.setCategorys(params.categorys).catch(function (err) {
                                console.log(err)
                            })
                        }
                    }).catch(function (err) {
                        console.log(err)
                    })
                    
                }catch(e){
                    console.log(e)
                }
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

