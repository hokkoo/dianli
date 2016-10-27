import { API_ROOT } from '../../../../config/config.js';
import * as _type from '../../../mutation-types.js';
import server from '../../../server.js';

export const getWiki = function({ dispatch }, id) {
  return new Promise((resolve) => {
    if(!id){
      return resolve();
    }
    this.$http.get('/message/wiki/find', {id: id}).then((rtn) => {
      rtn = rtn && rtn.data || {};
      if (rtn.successed) {
        resolve(rtn.data);
      }
    });
  });
}

export const saveWiki = function ({ dispatch }, item = {}) {
  if(item.id){
    return editWiki.call(this, {dispatch: dispatch} , item);
  }else{
    return createWiki.call(this, {dispatch: dispatch} , item);
  }
}

export const editWiki = function ({ dispatch }, item = {}) {
  let param = _.extend({}, item);
  param = {item: param};
  return new Promise((resolve) => {
    if(!item.id){
      return resolve(false);
    }
    this.$http.post('/message/wiki/edit', param).then((rtn) => {
      rtn = rtn && rtn.data || {};
      if (rtn.successed) {
        resolve(rtn.data);
      }
    });
  });
}


export const createWiki = function ({ dispatch }, item = {}) {
  let param = _.extend({}, item);
  param = {item: param};
  return new Promise((resolve) => {
    this.$http.post('/message/wiki/create', param).then((rtn) => {
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
