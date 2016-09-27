/**
    产品
 */

module.exports = {
    list : function(req,res,next) {
        //console.log(Object.keys(sails.sequelize));
        var Door = sails.sequelize['product.door'];
        var Images = sails.sequelize['product.images'];
        Door.findAll().then(function (rtn) {
            res.json(rtn);
        });

    },
    find : function(req,res,next) {
        //console.log(Object.keys(sails.sequelize));
        var Door = sails.sequelize['product.door'];
        var params = req.allParams(), where;
        if(params.id){
            Door.find(params.id).then(function (rtn) {
                res.json(rtn);
            });
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
};

