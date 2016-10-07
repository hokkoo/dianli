/**
	图片保存
 */
var path = require('path');
var uuid = require('uuid');
var _ = require('lodash');

module.exports = {
	index : function(req,res,next) {
		var Door = sails.sequelize['product.door'];
		var Image = sails.sequelize['product.image'];
		var data = {};
		var promises = [];
		promises.push(new Promise(function (resolve, reject) {
			Door.findAll({ limit: 3, order: 'createdAt DESC', 
				include: [
					{model: Image, as: 'images'}
				]
			}).then(function (doors) {
				_.each(doors,	function (door) {
					door.image = door.images && door.images[0] || null;
				});
				data['doors'] = doors;
				resolve();
			}).catch(function (error) {
				resolve();
			})
		}));
		Promise.all(promises).then(function () {
			res.json({
				successed: true,
				data: data
			})
		});
	},
	images : function(req,res,next) {
		var Image = sails.sequelize['product.image'];
		Image.findAll({
			limit: 20,
			order: 'createdAt DESC',
		}).then(function (images) {
			res.json({
				successed: true,
				data: images
			})
		});
	}
};

