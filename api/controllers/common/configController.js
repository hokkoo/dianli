/**
	图片保存
 */
var path = require('path');
var multer = require('multer');
var uuid = require('uuid');
module.exports = {
	ueditor : function(req,res,next) {
		res.json({
			"imageActionName": "/common/image/savetmp",
			"imageFieldName": "file",
			"imageMaxSize": 2048,
			"imageAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"]
		});
	}
};

