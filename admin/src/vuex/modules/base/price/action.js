import { API_ROOT } from '../../../../config/config.js';
import * as _type from '../../../mutation-types.js';
import server from '../../../server.js';



export const savePriceRule = function ({ dispatch }, rule) {
  var defer = $.Deferred();
  let param = _.extend({}, rule);
  param = {item: param};
  $.post('/product/price/savePriceRule', param).success( (rtn) => {
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
  console.log(rule);
  $.post('/product/price/deletePriceRule', {id: rule.id}).success( (rtn) => {
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
  param = {item: param};
  $.post('/product/price/createPriceRule', param).success( (rtn) => {
    if(rtn.successed){
      defer.resolve(rtn.data);
    }else{
      defer.resolve();
    }
  });
  return defer;
}

export const savePrice = function ({ dispatch }, price) {
  var defer = $.Deferred();
  let param = _.extend({}, price);
  param = {item: param};
  $.post('/product/price/savePrice', param).success( (rtn) => {
    if(rtn.successed){
      defer.resolve(rtn.data);
    }else{
      defer.resolve();
    }
  });
  return defer;
}


export const createPrice = function ({ dispatch }, price) {
  var defer = $.Deferred();
  let param = _.extend({}, price);
  param = {item: param};
  $.post('/product/price/createPrice', param).success( (rtn) => {
    if(rtn.successed){
      defer.resolve(rtn.data);
    }else{
      defer.resolve();
    }
  });
  return defer;
}