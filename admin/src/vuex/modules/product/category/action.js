import { API_ROOT } from '../../../../config/config.js';
import * as _type from '../../../mutation-types.js';
import server from '../../../server.js';

// 获取数据列表
export const getCategorys = function ({ dispatch }, type) {
  $.get('/product/category/list?type=' + (type || '')).success(function (rtn) {
    if(rtn.successed){
      dispatch(_type.GET_PRODUCT_CATEGORYS, rtn.data); 
    }
  });
}

export const getCategory = function ({ dispatch }, id) {
  if(id){
    $.get('/product/category/find?id=' + id).success((rtn) => {
      if(rtn.successed){
        dispatch(_type.GET_PRODUCT_CATEGORY, rtn.data);
      }
    });
  }else{
    dispatch(_type.GET_PRODUCT_CATEGORY, {});
  }
}

export const getCategorySubTree = function ({ dispatch }, type) {
  console.log(2)
  var defer = new $.Deferred();
  $.get('/product/category/list?type=' + (type || '')).success(function (rtn) {
    if(rtn.successed){
      // 目前只处理单树，不处理多树
      var map= {}, maxLength = 0, maxAncestor = [], rootMap = {};
      _.each(rtn.data, function (item) {
        map[item.id] = item;
      });
      var root, parent;
      _.each(map, function (item, id) {
        item.parent_id = parseInt(item.parent_id, 10);
        if(!item.parent_id){
          rootMap[item.id] = item;
        }else{
          parent = map[item.parent_id];
          if(parent){
            (parent.children || (parent.children = [])).push(item);
          }
        }
      });
      console.log(rootMap);
      dispatch(_type.GET_PRODUCT_CATEGORY_SUBTREE, rootMap || {}); 
      defer.resolve();
    }
  });
  return defer;
}




export const getCategoryTree = function ({ dispatch }, type) {
  $.get('/product/category/list?type=' + (type || '')).success(function (rtn) {
    if(rtn.successed){
      // 目前只处理单树，不处理多树
      var map= {}, maxLength = 0, maxAncestor = [];
      _.each(rtn.data, function (item) {
        map[item.id] = item;
      });
      var root, parent;
      _.each(map, function (item, id) {
        if(!item.parent_id){
          root = item;
        }else{
          parent = map[item.parent_id];
          if(parent){
            (parent.children || (parent.children = [])).push(item);
          }
        }
      });
      if(_.isUndefined(root.children)){
        root.children = [];
      }
      console.log(root);
      dispatch(_type.GET_PRODUCT_CATEGORY_TREE, root || {}); 
    }
  });
}

export const saveCategory = function ({ dispatch }, category) {
  var defer = $.Deferred();
  let param = _.extend({}, category);
  param = {item: param};
  if(!category.new){
    $.post('/product/category/edit', param).success( (rtn) => {
      if(rtn.successed){
        defer.resolve(rtn);
      }
    });
  }else{
    $.post('/product/category/create', param).success( (rtn) => {
      if(rtn.successed){
        defer.resolve(rtn);
      }
    });
  }
  return defer;
}

export const saveCategorys = function ({ dispatch }, categorys, type) {
  console.log(categorys);
  var defer = $.Deferred();
   $.post('/product/category/saves', {categorys: categorys, type: type}).success( (rtn) => {
      if(rtn.successed){
        console.log(rtn);
      }
    }).always(() => {
      defer.resolve();
    });
  return defer;
}