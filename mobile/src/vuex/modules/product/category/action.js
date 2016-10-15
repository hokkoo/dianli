import { API_ROOT } from '../../../../config/config.js';
import * as _type from '../../../mutation-types.js';
import server from '../../../server.js';

// 获取数据列表
export const getCategorys = function ({ dispatch }, type) {
  return new Promise((resolve) => {
     this.$http.get('/product/category/list?type=' + (type || '')).then((rtn) => {
      rtn = rtn && rtn.data || {};
      if(rtn.successed){
        dispatch(_type.GET_PRODUCT_CATEGORYS, rtn.data); 
      }
      resolve();
    });
  })
}

export const getCategory = function ({ dispatch }, id) {
  return new Promise((resolve) => {
    if(id){
       this.$http.get('/product/category/find?id=' + id).then((rtn) => {
        rtn = rtn && rtn.data || {};
        if(rtn.successed){
          dispatch(_type.GET_PRODUCT_CATEGORY, rtn.data);
        }
        resolve();
      });
    }else{
      dispatch(_type.GET_PRODUCT_CATEGORY, {});
      resolve();
    }
  })
}

export const getCategorySubTree = function ({ dispatch }, type) {
  return new Promise((resolve) => {
     this.$http.get('/product/category/list?type=' + (type || '')).then((rtn) => {
      rtn = rtn && rtn.data || {};
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
        resolve(rootMap || {});
      }
    });
  })
}




export const getCategoryTree = function ({ dispatch }, type) {
  return new Promise((resolve) => {
    this.$http.get('/product/category/list?type=' + (type || '')).then( (rtn) => {
      rtn = rtn && rtn.data || {};
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
        dispatch(_type.GET_PRODUCT_CATEGORY_TREE, root || {}); 
        resolve(root);
      }
    });
  })
}

export const saveCategory = function ({ dispatch }, category) {
  return new Promise((resolve) => {
    let param = _.extend({}, category);
    param = {item: param};
     if(!category.id){
       this.$http.post('/product/category/edit', category).then( (rtn) => {
        rtn = rtn && rtn.data || {};
        if(rtn.successed){
          resolve(rtn.data);
        }
      });
    }else{
      $.post('/product/category/create', param).then( (rtn) => {
        rtn = rtn && rtn.data || {};
        if(rtn.successed){
          resolve(rtn.data);
        }
      });
    }
  });
}

export const saveCategorys = function ({ dispatch }, categorys) {
  return new Promise((resolve) => {
    this.$http.post('/product/category/creates', {categorys: categorys}).then( (rtn) => {
      rtn = rtn && rtn.data || {};
      if(rtn.successed){
        resolve(rtn.data);
      }
    });
  });
}