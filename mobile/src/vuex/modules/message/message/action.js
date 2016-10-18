import { API_ROOT } from '../../../../config/config.js';
import * as _type from '../../../mutation-types.js';
import server from '../../../server.js';

// 获取数据列表

export const saveMessage = function ({ dispatch }, item) {
  return new Promise((resolve) => {
    let param = _.extend({}, item);
    param = {item: param};
     if(item.id){
       this.$http.post('/message/message/edit', param).then( (rtn) => {
        rtn = rtn && rtn.data || {};
        if(rtn.successed){
          resolve(rtn.data);
        }
      });
    }else{
      this.$http.post('/message/message/create', param).then( (rtn) => {
        rtn = rtn && rtn.data || {};
        if(rtn.successed){
          resolve(rtn.data);
        }
      });
    }
  });
}