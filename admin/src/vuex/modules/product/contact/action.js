import { API_ROOT } from '../../../../config/config.js';
import * as _type from '../../../mutation-types.js';
import server from '../../../server.js';

// 获取数据列表
export const getContacts = function ({ dispatch }) {
  var defer = new $.Deferred();
  $.get('/user/contact/list').success(function (rtn) {
    if(rtn.successed){
      dispatch(_type.GET_PRODUCT_CONTACTS, rtn.data); 
      defer.resolve(rtn.data);
    }else{
      defer.resolve();
    }
  });
  return defer;
}

export const getContact = function ({ dispatch }, id) {
  var defer = new $.Deferred();
  if(id){
    $.get('/user/contact/find?id=' + id).success((rtn) => {
      if(rtn.successed){
        dispatch(_type.GET_PRODUCT_CONTACT, rtn.data);
        defer.resolve(rtn.data);
      }
    });
  }else{
    dispatch(_type.GET_PRODUCT_CONTACT, {});
    defer.resolve();
  }
  return defer;
}

export const saveContact = function ({ dispatch }, contact) {
  var defer = $.Deferred();
  let param = _.extend({}, contact);
  param = {item: param};
  if(!contact.new){
    $.post('/user/contact/edit', param).success( (rtn) => {
      if(rtn.successed){
        defer.resolve(rtn.data);
      }else{
        defer.resolve();
      }
    });
  }else{
    $.post('/user/contact/create', param).success( (rtn) => {
      if(rtn.successed){
        defer.resolve(rtn.data);
      }else{
        defer.resolve();
      }
    });
  }
  return defer;
}

export const saveContacts = function ({ dispatch }, contacts) {
  var defer = $.Deferred();
   $.post('/user/contact/creates', {contacts: contacts}).success( (rtn) => {
      if(rtn.successed){
        defer.resolve(rtn.data);
      }else{
        defer.resolve();
      }
    });
  return defer;
}