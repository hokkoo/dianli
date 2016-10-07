import { API_ROOT } from '../../../../config/config.js';
import * as _type from '../../../mutation-types.js';
import server from '../../../server.js';

// 获取数据列表
export const getDoors = function ({ dispatch }, pager) {
  return new Promise((resolve) => {
    this.$http.get('/product/door/list').then((rtn) => {
      rtn = rtn && rtn.data || {};
      if(rtn.successed){
        dispatch(_type.GET_PRODUCT_DOORS, rtn.data);
      }
      resolve();
    });
  })
}

export const getDoor = function ({ dispatch }, id) {
  return new Promise((resolve) => {
    if(id){
     this.$http.get('/product/door/find?id=' + id).success((rtn) => {
        if(rtn.successed){
          dispatch(_type.GET_PRODUCT_DOOR, rtn.data);
        }
        resolve();
      });
    }else{
      dispatch(_type.GET_PRODUCT_DOOR, {});
      resolve();
    }
  })
}
