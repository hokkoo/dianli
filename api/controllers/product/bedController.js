/**
	产品
 */

module.exports = {
	list : function(rep,res,next) {
		var Bed = sails.models['product/bed'];
		Bed.find().populate('images').exec(function(err, list) {
			if(err) return res.json(err);
			res.json(list);
		});
	}
};

