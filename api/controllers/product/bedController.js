/**
	产品
 */

module.exports = {
    list : function(rep,res,next) {
        //console.log(Object.keys(sails.sequelize));
        var Bed = sails.sequelize['product.bed'];
        var Images = sails.sequelize['product.images'];
        Bed.findAll({
            include: [{
                model: Images
            }]
        }).then(function (rtn) {
            console.log(JSON.stringify(rtn));
            res.json(rtn);
        });

    }
};

