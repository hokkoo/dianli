import { API_ROOT } from '../../../../config/config.js';
import * as _type from '../../../mutation-types.js';
import server from '../../../server.js';

// 获取数据列表
export const getHomeHots = function ({ dispatch }) {
  var _self = this;
  console.log(_self);
  return new Promise((resolve) => {
    this.$http.get('/hot/hot/index').then((rtn) => {
      rtn = rtn && rtn.data || {};
      if(rtn.successed){
        dispatch(_type.GET_HOT_HOMES, rtn.data);
      }
      resolve();
    });
  })
}