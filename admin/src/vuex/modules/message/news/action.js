import { API_ROOT } from '../../../../config/config.js';
import * as _type from '../../../mutation-types.js';
import server from '../../../server.js';

export const getNews = function({ dispatch }, id) {
  return new Promise((resolve) => {
    if(!id){
      return resolve();
    }
    this.$http.get('/message/news/find', {id: id}).then((rtn) => {
      rtn = rtn && rtn.data || {};
      if (rtn.successed) {
        resolve(rtn.data);
      }
    });
  });
}

export const saveNews = function ({ dispatch }, item = {}) {
  if(item.id){
    return editNews.call(this, {dispatch: dispatch} , item);
  }else{
    return createNews.call(this, {dispatch: dispatch} , item);
  }
}

export const editNews = function ({ dispatch }, item = {}) {
  let param = _.extend({}, item);
  param = {item: param};
  return new Promise((resolve) => {
    if(!item.id){
      return resolve(false);
    }
    this.$http.post('/message/news/edit', param).then((rtn) => {
      rtn = rtn && rtn.data || {};
      if (rtn.successed) {
        resolve(rtn.data);
      }
    });
  });
}


export const createNews = function ({ dispatch }, item = {}) {
  let param = _.extend({}, item);
  param = {item: param};
  return new Promise((resolve) => {
    this.$http.post('/message/news/create', param).then((rtn) => {
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
