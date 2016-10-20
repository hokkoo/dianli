import { API_ROOT } from '../../../../config/config.js';
import * as _type from '../../../mutation-types.js';
import server from '../../../server.js';

// 获取数据列表
export const login = function ({ dispatch }, item = {}) {
  return new Promise((resolve) => {
    console.log(item);
     this.$http.post('/user/login/login', {item: item}).then((rtn) => {
      rtn = rtn && rtn.data || {};
      if(rtn.successed){
        dispatch(_type.GET_USER_USER, rtn.data); 
        resolve(rtn);
      }else{
        resolve(rtn) ;
      }
    });
  })
}
