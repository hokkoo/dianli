/**
 * Company/c_mechanicController
 *
 * @description :: Server-side logic for managing company/c_mechanics
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {
	listcompanys : function(rep,res,next) {
		var Company_ex =  sails.models['company_ex'];
		Company_ex.find().exec(function(err,datas){
			res.json(datas);
		})
	}
};

