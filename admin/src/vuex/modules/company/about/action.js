import { API_ROOT } from '../../../../config/config.js';
import * as _type from '../../../mutation-types.js';
import server from '../../../server.js';

// 获取数据列表
export const getAboutUsData = function ({ dispatch }, type) {
	console.log(this.$http)
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


export const saveAboutUs = function ({ dispatch }, item = {}) {
  if(item.id){
    return editAboutUs.call(this, {dispatch: dispatch} , item);
  }else{
    return createAboutUs.call(this, {dispatch: dispatch} , item);
  }
}


export const editAboutUs = function ({ dispatch }, item = {}) {
  let param = _.extend({}, item);
  param = {item: param};
	console.log(this.$http)
  return new Promise((resolve) => {
     this.$http.post('/company/about/edit', param).then((rtn) => {
      rtn = rtn && rtn.data || {};
      if(rtn.successed){
	      resolve(rtn.data);
	    }else{
	      resolve();
	    }
    });
  })
}

export const createAboutUs = function ({ dispatch }, item = {}) {
  let param = _.extend({}, item);
  param = {item: param};
  return new Promise((resolve) => {
     this.$http.post('/company/about/create', param).then((rtn) => {
      rtn = rtn && rtn.data || {};
      if(rtn.successed){
	      resolve(rtn.data);
	    }else{
	      resolve();
	    }
    });
  })
}


export const addAboutUsImage = function ({ dispatch }, item = {}) {
  let param = _.extend({}, item);
  param = {item: param};
  console.log(this.$http)
  return new Promise((resolve) => {
     this.$http.post('/company/about/addImage', param).then((rtn) => {
      rtn = rtn && rtn.data || {};
      if(rtn.successed){
        resolve(rtn.data);
      }else{
        resolve();
      }
    });
  })
}

export const deleteAboutUsImage = function ({ dispatch }, item = {}) {
  let param = _.extend({}, item);
  param = {item: param};
  console.log(this.$http)
  return new Promise((resolve) => {
     this.$http.post('/company/about/deleteImage', param).then((rtn) => {
      rtn = rtn && rtn.data || {};
      if(rtn.successed){
        resolve(rtn.data);
      }else{
        resolve();
      }
    });
  })
}
