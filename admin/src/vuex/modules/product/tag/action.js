import { API_ROOT } from '../../../../config/config.js';
import * as _type from '../../../mutation-types.js';
import server from '../../../server.js';

// 获取数据列表
export const getTags = function ({ dispatch }, type) {
  var defer = $.Deferred();
  $.get('/product/tag/list?type=' + (type || '')).success(function (rtn) {
    if(rtn.successed){
      dispatch(_type.GET_PRODUCT_TAGS, rtn.data);
      defer.resolve(rtn.data);
    }else{
      defer.resolve([]);
    }
  });
  return defer;
}

export const getTag = function ({ dispatch }, id) {
  var defer = $.Deferred();
  if(id){
    $.get('/product/tag/find?id=' + id).success((rtn) => {
      if(rtn.successed){
        dispatch(_type.GET_PRODUCT_TAG, rtn.data);
        defer.resolve();
      }
    });
  }else{
    dispatch(_type.GET_PRODUCT_TAG, {});
    defer.resolve();
  }
  return defer;
}

export const editTag = function ({ dispatch }, tag) {
  var defer = $.Deferred();
  let param = _.extend({}, tag);
  param = {item: param};
  $.post('/product/tag/edit', param).success( (rtn) => {
    if(rtn.successed){
      defer.resolve(rtn.data || true)
    }
  }).always(() => {
    defer.resolve();
  });
  return defer;
}

export const deleteTag = function ({ dispatch }, tag) {
  var defer = $.Deferred();
  let param = _.extend({}, tag);
  $.post('/product/tag/delete', {id: tag.id}).success( (rtn) => {
    if(rtn.successed){
      defer.resolve(true)
    }
  }).always(() => {
    defer.resolve();
  });
  return defer;
}

export const saveTag = function ({ dispatch }, tag) {
  var defer = $.Deferred();
  let param = _.extend({}, tag);
  param = {item: param};
  if(tag.id){
    $.post('/product/tag/edit', param).success( (rtn) => {
      if(rtn.successed){
        defer.resolve(rtn.data);
      }
    }).always(() => {
      defer.resolve();
    });
  }else{
    $.post('/product/tag/create', param).success( (rtn) => {
      if(rtn.successed){
        _.extend(tag, rtn.data);
        defer.resolve(rtn.data);
      }
    }).always(() => {
      defer.resolve();
    });
  }
  return defer;
}

export const saveTags = function ({ dispatch }, tags, type) {
  console.log(tags);
  var defer = $.Deferred();
   $.post('/product/tag/saves', {tags: tags, type: type}).success( (rtn) => {
      if(rtn.successed){
        console.log(rtn);
        defer.resolve(rtn.data || true);
      }
    }).always(() => {
      defer.resolve();
    });
  return defer;
}