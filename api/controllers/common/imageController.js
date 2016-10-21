/**
    图片保存
 */
var path = require('path');
var multer = require('multer');
var uuid = require('uuid');
var mime = require('mime');

var uploadPath = path.resolve(process.cwd(), './upload/images/');
var uploadTmpPath = path.resolve(process.cwd(), './upload/tmp/');
var uploadCompanyPath = path.resolve(process.cwd(), './upload/company/');
var uploadMessagePath = path.resolve(process.cwd(), './upload/message/');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
      //console.log(Object.keys(file));
      var extension = mime.extension(file.mimetype);
    cb(null, (file.originalname || file.filename || file.name || file.fieldname) + '-[' + uuid.v1()+ '].'+extension);
  }
});

var tmpStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadTmpPath)
  },
  filename: function (req, file, cb) {
      //console.log(Object.keys(file));
      var extension = mime.extension(file.mimetype);
    cb(null, (file.originalname || file.filename || file.name || file.fieldname) + '-[' + uuid.v1()+ '].'+extension);
  }
});

var companyStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadCompanyPath)
  },
  filename: function (req, file, cb) {
      //console.log(Object.keys(file));
      var extension = mime.extension(file.mimetype);
    cb(null, (file.originalname || file.filename || file.name || file.fieldname) + '-[' + uuid.v1()+ '].'+extension);
  }
});

var messageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadMessagePath)
  },
  filename: function (req, file, cb) {
      //console.log(Object.keys(file));
      var extension = mime.extension(file.mimetype);
    cb(null, (file.originalname || file.filename || file.name || file.fieldname) + '-[' + uuid.v1()+ '].'+extension);
  }
});

var upload = multer({ storage: storage });

var singleUpload = upload.single('file');
var multipleUpload = upload.array('file', 12);

var uploadTmp = multer({ storage: tmpStorage });

var singleUploadTmp = uploadTmp.single('file');
var multipleUploadTmp = uploadTmp.array('file', 12)

var uploadCompany = multer({ storage: companyStorage });

var singleUploadCompany = uploadCompany.single('file');
var multipleUploadCompany = uploadCompany.array('file', 12)

var uploadMessage = multer({ storage: messageStorage });

var singleUploadMessage = uploadMessage.single('file');
var multipleUploadMessage = uploadMessage.array('file', 12)

var urlPrefix = {
    image: '/upload/images/',
    imageCompany: '/upload/company/',
    imageMessage: '/upload/message/',
    tmpImage: '/upload/tmp/'
}

module.exports = {
    save : function(req,res,next) {
        var params = req.allParams();
        singleUpload(req, res, function () {
            var params = req.allParams();
            var file = req.file;
            var item = {
                name: file.filename,
                extension: mime.extension(file.mimetype),
                size: file.size,
                originalname: file.originalname,
                destination: file.destination,
                path: file.path,
                type: params.type || 0,
                url: urlPrefix.image + file.filename
            };
            var Image;
            if(params.gallery_id){
                Image = sails.sequelize['product.gallery-image'];
                item.related_id = params.gallery_id;
            }else{
                Image = sails.sequelize['product.upload-images'];
            }
            Image.create(item).then(function (data) {
                res.json({
                    successed: true,
                    data: data
                });
            });
        });
    },
    saveCompanyImage : function(req,res,next) {
        var params = req.allParams();
        singleUploadCompany(req, res, function () {
            var params = req.allParams();
            var file = req.file;
            var item = {
                name: file.filename,
                extension: mime.extension(file.mimetype),
                size: file.size,
                originalname: file.originalname,
                destination: file.destination,
                path: file.path,
                type: params.type || 0,
                url: urlPrefix.imageCompany + file.filename
            };
            var Image = sails.sequelize['company.company-image'];
            Image.create(item).then(function (data) {
                res.json({
                    successed: true,
                    data: data
                });
            });
        });
    },
    saveMessageImage : function(req,res,next) {
        var params = req.allParams();
        singleUploadMessage(req, res, function () {
            var params = req.allParams();
            var file = req.file;
            var item = {
                name: file.filename,
                extension: mime.extension(file.mimetype),
                size: file.size,
                originalname: file.originalname,
                destination: file.destination,
                path: file.path,
                type: params.type || 0,
                url: urlPrefix.imageMessage + file.filename
            };
            var Image = sails.sequelize['message.message-image'];
            Image.create(item).then(function (data) {
                res.json({
                    successed: true,
                    data: data
                });
            });
        });
    },
    saveTmp : function(req,res,next) {
        var params = req.allParams();
        // if(!params.file){
        //     return res.json({
        //         successed: false,
        //         message: "未上传文件"
        //     });
        // }
        singleUploadTmp(req, res, function () {
            var file = req.file;
            var UploadTmp = sails.sequelize['product.upload-tmp'];
            UploadTmp.create({
                name: file.filename,
                extension: mime.extension(file.mimetype),
                size: file.size,
                originalname: file.originalname,
                destination: file.destination,
                path: file.path,
                type: params.type || 0,
                url: urlPrefix.tmpImage + file.filename
            });
            res.json({
                name: file.filename,
                originalName: file.originalname,
                size: file.size,
                state: 'SUCCESS',
                type: mime.extension(file.mimetype),
                url: '/upload/tmp/' + file.filename
            });
        });
    },
    saves : function(req,res,next) {
        res.json([1,2,3]);
    }
};

