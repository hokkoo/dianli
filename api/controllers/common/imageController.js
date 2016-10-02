/**
	图片保存
 */
var path = require('path');
var multer = require('multer');
var uuid = require('uuid');
var mime = require('mime');

var uploadPath = path.resolve(process.cwd(), './upload/images/');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
  	//console.log(Object.keys(file));
  	var extension = mime.extension(file.mimetype);
    cb(null, file.fieldname + '-[' + uuid.v1()+ '].'+extension);
  }
});
var upload = multer({ storage: storage });

var singleUpload = upload.single('file');
var multipleUpload = upload.array('file', 12)

module.exports = {
	save : function(req,res,next) {
		singleUpload(req, res, function () {
			var params = req.allParams();
			var file = req.file;
			var UploadImage = sails.sequelize['product.upload-images'];
			UploadImage.create({
				name: file.filename,
				extension: mime.extension(file.mimetype),
				size: file.size,
				originalname: file.originalname,
				destination: file.destination,
				path: file.path,
				type: params.type || 0
			});
			res.json({
				successed: true,
				data: req.file
			});
		});
	},
	saves : function(req,res,next) {
		res.json([1,2,3]);
	}
};

