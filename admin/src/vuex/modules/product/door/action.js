import { API_ROOT } from '../../../../config/config.js';
import * as _type from '../../../mutation-types.js';
import server from '../../../server.js';

// 获取数据列表
export const getDoors = function ({ dispatch }, pager) {
  $.get('/product/door/list').success(function (rtn) {
    if(rtn.successed){
      dispatch(_type.GET_PRODUCT_DOORS, rtn.data);
    }
  });
}

export const getDoor = function ({ dispatch }, id) {
  var defer = $.Deferred();
  if(id){
    $.get('/product/door/find?id=' + id).success((rtn) => {
      if(rtn.successed){
        //dispatch(_type.GET_PRODUCT_DOOR, rtn.data);
        defer.resolve(rtn.data);
      }else{
        defer.resolve();
      }
    });
  }else{
    dispatch(_type.GET_PRODUCT_DOOR, {});
    defer.resolve();
  }
  return defer;
}

export const saveDoor = function ({ dispatch }, door) {
  console.log('#####')
  console.log(door);
  var defer = $.Deferred();
  let param = _.extend({}, door);
  param = {item: param};
  if(door.id){
    $.post('/product/door/edit', param).success( (rtn) => {
      if(rtn.successed){
        defer.resolve(rtn.data);
      }
    }).always(() => {
      defer.resolve();
    });
  }else{
    $.post('/product/door/create', param).success( (rtn) => {
      if(rtn.successed){
        _.extend(door, rtn.data);
      }
    }).always(() => {
      defer.resolve();
    });
  }
  return defer;
}

export const addImage = function ({ dispatch }, item = {}) {
  let param = _.extend({}, item);
  param = {item: param};
  return new Promise((resolve) => {
     this.$http.post('/product/door/addImage', param).then((rtn) => {
      rtn = rtn && rtn.data || {};
      if(rtn.successed){
        resolve(rtn.data);
      }else{
        resolve();
      }
    });
  })
}

export const deleteImage = function ({ dispatch }, item = {}) {
  let param = _.extend({}, item);
  param = {item: param};
  return new Promise((resolve) => {
     this.$http.post('/product/door/deleteImage', param).then((rtn) => {
      rtn = rtn && rtn.data || {};
      if(rtn.successed){
        resolve(rtn.data);
      }else{
        resolve();
      }
    });
  })
}