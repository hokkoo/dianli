/**
	图片保存
 */
var path = require('path');
var multer = require('multer');
var uuid = require('uuid');

var uploadPath = path.resolve(process.cwd(), './upload/images/');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + uuid.v1());
  }
});
var upload = multer({ storage: storage });

var singleUpload = upload.single('file');
var multipleUpload = upload.array('file', 12)

module.exports = {
	save : function(req,res,next) {
		singleUpload(req, res, function () {
			console.log(req.file);
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

