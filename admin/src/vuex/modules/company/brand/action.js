import { API_ROOT } from '../../../../config/config.js';
import * as _type from '../../../mutation-types.js';
import server from '../../../server.js';

export const getBrand = function({ dispatch }, id) {
  return new Promise((resolve) => {
    if(!id){
      return resolve();
    }
    this.$http.get('/company/brand/find', {id: id}).then((rtn) => {
      rtn = rtn && rtn.data || {};
      if (rtn.successed) {
        resolve(rtn.data);
      }
    });
  });
}

export const saveBrand = function ({ dispatch }, item = {}) {
  if(item.id){
    return editBrand.call(this, {dispatch: dispatch} , item);
  }else{
    return createBrand.call(this, {dispatch: dispatch} , item);
  }
}

export const editBrand = function ({ dispatch }, item = {}) {
  let param = _.extend({}, item);
  param = {item: param};
  return new Promise((resolve) => {
    if(!item.id){
      return resolve(false);
    }
    this.$http.post('/company/brand/edit', param).then((rtn) => {
      rtn = rtn && rtn.data || {};
      if (rtn.successed) {
        resolve(rtn.data);
      }
    });
  });
}


export const createBrand = function ({ dispatch }, item = {}) {
  let param = _.extend({}, item);
  param = {item: param};
  return new Promise((resolve) => {
    this.$http.post('/company/brand/create', param).then((rtn) => {
      rtn = rtn && rtn.data || {};
      if (rtn.successed) {
        resolve(rtn.data);
      }
    });
  });
}


export const addImage = function ({ dispatch }, item = {}) {
  let param = _.extend({}, item);
  param = {item: param};
  return new Promise((resolve) => {
     this.$http.post('/message/news/addImage', param).then((rtn) => {
      rtn = rtn && rtn.data || {};
      if(rtn.successed){
        resolve(rtn.data);
      }else{
        resolve();
      }
    });
  })
}

export const deleteImage = function ({ dispatch }, item = {}) {
  let param = _.extend({}, item);
  param = {item: param};
  return new Promise((resolve) => {
     this.$http.post('/message/news/deleteImage', param).then((rtn) => {
      rtn = rtn && rtn.data || {};
      if(rtn.successed){
        resolve(rtn.data);
      }else{
        resolve();
      }
    });
  })
}
