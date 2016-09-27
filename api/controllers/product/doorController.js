/**
    产品
 */

module.exports = {
    list : function(rep,res,next) {
        //console.log(Object.keys(sails.sequelize));
        var Door = sails.sequelize['product.door'];
        var Images = sails.sequelize['product.images'];
        Door.findAll().then(function (rtn) {
            res.json(rtn);
        });

    }
};

