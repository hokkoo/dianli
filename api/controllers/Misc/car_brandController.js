/**
 * Misc/car_brandController
 *
 * @description :: Server-side logic for managing misc/car_brands
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var Car_brand = require('../../sequelize/model/misc/car_brand');
var Car_model = require('../../sequelize/model/misc/car_model');
module.exports = {
	brand_models : function brand_models(req, res, next) {
		Car_brand.findAll({
                     include: [{
                        model: Car_model,
                        as: 'models',
                        attributes:['model_id','model_name','status','tech_owner','level']
                    }],
                    attributes:['brand_id','brand_name','brand_init']
            }).then(function(data) {
                if(data&&data.length){
		          res.json({
		              status : 'success',
		              data : data
		          })
		      }else{
		          res.json({
		              status :'error',
		              msg : '无数据'
		          })
		      }
            });
	}
};

