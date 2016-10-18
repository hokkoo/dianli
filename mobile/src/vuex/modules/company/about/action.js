import { API_ROOT } from '../../../../config/config.js';
import * as _type from '../../../mutation-types.js';
import server from '../../../server.js';

// 获取数据列表
export const getAboutUsData = function ({ dispatch }, type) {
  return new Promise((resolve) => {
     this.$http.get('/company/about/index').then((rtn) => {
      rtn = rtn && rtn.data || {};
      if(rtn.successed){
        dispatch(_type.GET_COMPANY_ABOUT, rtn.data); 
        resolve(rtn.data);
      }
    });
  })
}
