import { API_ROOT } from '../../../../config/config.js';
import * as _type from '../../../mutation-types.js';
import server from '../../../server.js';



export const savePriceRule = function ({ dispatch }, rule) {
  var defer = $.Deferred();
  let param = _.extend({}, rule);
  param = {rule: param};
  $.post('/base/price/editPriceRule', param).success( (rtn) => {
    if(rtn.successed){
      defer.resolve(rtn.data);
    }else{
      defer.resolve();
    }
  });
  return defer;
}


export const deletePriceRule = function ({ dispatch }, rule = {}) {
  var defer = $.Deferred();
  $.post('/base/price/deletePriceRule', {id: rule.id}).success( (rtn) => {
    if(rtn.successed){
      defer.resolve(rtn.data);
    }else{
      defer.resolve();
    }
  });
  return defer;
}

export const createPriceRule = function ({ dispatch }, rule) {
  var defer = $.Deferred();
  let param = _.extend({}, rule);
  param = {rule: param};
  $.post('/base/price/createPriceRule', param).success( (rtn) => {
    if(rtn.successed){
      defer.resolve(rtn.data);
    }else{
      defer.resolve();
    }
  });
  return defer;
}
