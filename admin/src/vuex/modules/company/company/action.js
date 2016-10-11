import { API_ROOT } from '../../../../config/config.js';
import * as _type from '../../../mutation-types.js';
import server from '../../../server.js';


// 获取数据列表
export const getCompanys = function ({ dispatch }, type) {
  var defer = $.Deferred();
  $.get('/company/company/list?type=' + (type || '')).success(function (rtn) {
    if(rtn.successed){
      dispatch(_type.GET_PRODUCT_TAGS, rtn.data);
      defer.resolve(rtn.data);
    }else{
      defer.resolve([]);
    }
  });
  return defer;
}

export const getCompany = function ({ dispatch }, id) {
  var defer = $.Deferred();
  if(id){
    $.get('/company/company/find?id=' + id).success((rtn) => {
      if(rtn.successed){
        dispatch(_type.GET_PRODUCT_TAG, rtn.data);
        defer.resolve(rtn.data);
      }
    });
  }else{
    dispatch(_type.GET_PRODUCT_TAG, {});
    defer.resolve();
  }
  return defer;
}

export const saveCompany = function ({ dispatch }, item = {}) {
  var defer = $.Deferred();
  if(item.id){
    return editCompany({dispatch: dispatch} , item);
  }else{
    return createCompany({dispatch: dispatch} , item);
  }
}

export const editCompany = function ({ dispatch }, item = {}) {
  var defer = $.Deferred();
  let param = _.extend({}, item);
  param = {item: param};
  $.post('/company/company/edit', param).success( (rtn) => {
    if(rtn.successed){
      defer.resolve(rtn.data);
    }else{
      defer.resolve();
    }
  });
  return defer;
}


export const createCompany = function ({ dispatch }, item = {}) {
  var defer = $.Deferred();
  let param = _.extend({}, item);
  param = {item: param};
  $.post('/company/company/create', param).success( (rtn) => {
    if(rtn.successed){
      defer.resolve(rtn.data);
    }else{
      defer.resolve();
    }
  });
  return defer;
}

export const deleteCompany = function ({ dispatch }, id) {
  var defer = $.Deferred();
  var param = {id: id};
  $.post('/company/company/delete', param).success( (rtn) => {
    if(rtn.successed){
      defer.resolve(rtn.data || id);
    }else{
      defer.resolve();
    }
  });
  return defer;
}
