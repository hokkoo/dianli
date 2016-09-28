import { API_ROOT } from '../../../../config/config.js';
import * as _type from '../../../mutation-types.js';
import server from '../../../server.js';

// 获取数据列表
export const getDoors = function ({ dispatch }, pager) {
  $.get('/product/door/list').success(function (rtn) {
    dispatch(_type.GET_PRODUCT_DOORS, rtn);
  });
}

export const getDoor = function ({ dispatch }, id) {
  if(id){
    $.get('/product/door/find?id=' + id).success((rtn) => {
      if(rtn){
        dispatch(_type.GET_PRODUCT_DOOR, rtn);
      }
    });
  }else{
    dispatch(_type.GET_PRODUCT_DOOR, {});
  }
}

export const saveDoor = function ({ dispatch }, door) {
  console.log('#####')
  console.log(door);
  var defer = $.Deferred();
  let param = _.extend({}, door);
  if(param.id){
    $.post('/product/door/edit', param).success( (rtn) => {
      if(rtn.successed){
        console.log(rtn);
      }
    }).always(() => {
      defer.resolve();
    });
  }else{
    $.post('/product/door/save', param).success( (rtn) => {
      if(rtn.successed){
        door.id = rtn.id;
        console.log(rtn);
      }
    }).always(() => {
      defer.resolve();
    });
  }
  return defer;
}