/**
* Company_ex.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	company_id :{
  		type :'bigtint',
  		primaryKey: true
  	},
  	mechanic_id :{
  		type :'bigtint',
  		primaryKey: true
  	},
  	group_id :{
  		type :'bigtint'
  	},
  	name :{
  		type :'string'
  	},
  	operatingpost :{
  		type :'string'
  	},
  	mobile :{
  		type :'string'
  	},
  	push_message :{
  		type :'int'
  	},
  	pwd :{
  		type :'string'
  	},
  	in_date :{
  		type :'date'
  	},
  	status :{
  		type :'int'
  	},
  	out_date :{
  		type :'date'
  	},
  	memo :{
  		type :'text'
  	},
  	create_time :{
  		type :'date'
  	},
  	update_time :{
  		type :'date'
  	}
  },
  connection : 'd_company'
};

