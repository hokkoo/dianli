/**
 * Misc/p_templateController
 *
 * @description :: Server-side logic for managing misc/p_templates
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var P_template = require('../../sequelize/model/misc/p_template');
var P_template_item = require('../../sequelize/model/misc/p_template_item');
var P_template_process = require('../../sequelize/model/misc/p_template_process');


var Company_ex = require('../../sequelize/model/company/company_ex');
module.exports = {
    search: function search(req, res, next) {
        var query = req.params.all()['query'];
        var search = req.search;
        var c = {
            include : [{
                model: Company_ex,
                as: 'company',
                attributes: ['company_id', 'name', 'short_name'],
                where :{}
            }],
            where : {
                $and : {},
                $or :{}
            },
            limit: search.page.offset,
            offset: search.page.offset * (search.page.cur - 1)
        };
        if(query['company_id']==0){
            delete c.include;
            c.where['$and']['company_id']=0;
        }else{
            if(query['company_name']){
                c.include[0].where['name']={
                    $like :'%'+query['company_name']+'%'
                }
            }
        }
        if(query['business_id']){
            c.where['$and']['business_id']=query['business_id'];
        }
        if(query['sub_business_id']){
            c.where['$and']['sub_business_id']=query['sub_business_id'];
        }
        return P_template.findAndCount(c).then(function(data) {
            if(data){
                search.page.pages = Math.ceil(data.count / search.page.offset) || 1;
            }
            res.json({
                data : data.rows,
                count : data.count,
                status : 'success',
                search : search
            })
        });
    },
    p_template : function p_template(req, res, next) {
        var template_id = req.params.all()['template_id'];
        var company_id = req.params.all()['company_id'];
        var c ={
            where :{
                template_id : template_id
            },
            include : [
                {
                    model: P_template_item,
                    as: 'items'
                },
                {
                    model: P_template_process,
                    as: 'processes'
                }
            ]
        };
        if(company_id!=0){
            c.include.push({
                    model: Company_ex,
                    as: 'company',
                    attributes: ['company_id', 'name', 'short_name'],
                    where :{}
            });
        }
        return P_template.find(c).then(function(data){
            return res.json({
                status :'success',
                data : data
            })
        });
    }
};