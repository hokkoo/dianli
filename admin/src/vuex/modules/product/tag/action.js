import { API_ROOT } from '../../../../config/config.js';
import * as _type from '../../../mutation-types.js';
import server from '../../../server.js';

// 获取数据列表
export const getTags = function ({ dispatch }, type) {
  $.get('/product/tag/list?type=' + (type || '')).success(function (rtn) {
    dispatch(_type.GET_PRODUCT_TAGS, rtn);
  });
}

export const getTag = function ({ dispatch }, id) {
  if(id){
    $.get('/product/tag/find?id=' + id).success((rtn) => {
      if(rtn){
        dispatch(_type.GET_PRODUCT_TAG, rtn);
      }
    });
  }else{
    dispatch(_type.GET_PRODUCT_TAG, {});
  }
}

export const saveTag = function ({ dispatch }, tag) {
  console.log(tag);
  var defer = $.Deferred();
  let param = _.extend({}, tag);
  param = {item: param};
  if(tag.id){
    $.post('/product/tag/edit', param).success( (rtn) => {
      if(rtn.successed){
        console.log(rtn);
      }
    }).always(() => {
      defer.resolve();
    });
  }else{
    $.post('/product/tag/create', param).success( (rtn) => {
      if(rtn.successed){
        _.extend(tag, rtn.data);
      }
    }).always(() => {
      defer.resolve();
    });
  }
  return defer;
}

export const saveTags = function ({ dispatch }, tags, type) {
  console.log(tag);
  var defer = $.Deferred();
   $.post('/product/tag/saves', {tags: tags, type: type}).success( (rtn) => {
      if(rtn.successed){
        console.log(rtn);
      }
    }).always(() => {
      defer.resolve();
    });
  return defer;
}