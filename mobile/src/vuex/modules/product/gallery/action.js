import { API_ROOT } from '../../../../config/config.js';
import * as _type from '../../../mutation-types.js';
import server from '../../../server.js';



export const saveGallery = function ({ dispatch }, item) {
  var defer = $.Deferred();
  let param = _.extend({}, item);
  param = {item: param};
  $.post('/product/gallery/edit', param).success( (rtn) => {
    if(rtn.successed){
      defer.resolve(rtn.data);
    }else{
      defer.resolve();
    }
  });
  return defer;
}

export const createGallery = function ({ dispatch }, item) {
  var defer = $.Deferred();
  let param = _.extend({}, item);
  param = {item: param};
  $.post('/product/gallery/create', param).success( (rtn) => {
    if(rtn.successed){
      defer.resolve(rtn.data);
    }else{
      defer.resolve();
    }
  });
  return defer;
}

export const deleteGalary = function ({ dispatch }, item = {}) {
  var defer = $.Deferred();
  $.post('/product/gallery/delete', {id: item.id}).success( (rtn) => {
    if(rtn.successed){
      defer.resolve(rtn.data);
    }else{
      defer.resolve();
    }
  });
  return defer;
}


export const addImage = function ({ dispatch }, item) {
  var defer = $.Deferred();
  let param = _.extend({}, item);
  param = {item: param};
  $.post('/product/gallery/createImage', param).success( (rtn) => {
    if(rtn.successed){
      defer.resolve(rtn.data);
    }else{
      defer.resolve();
    }
  });
  return defer;
}

export const deleteImage = function ({ dispatch }, item) {
  var defer = $.Deferred();
  $.post('/product/gallery/deleteImage', {id: item.id}).success( (rtn) => {
    if(rtn.successed){
      defer.resolve(rtn.data);
    }else{
      defer.resolve();
    }
  });
  return defer;
}

export const getGallery = function ({ dispatch }, id) {
  var defer = $.Deferred();
  $.get('/product/gallery/find', {id: id}).success( (rtn) => {
    if(rtn.successed){
      defer.resolve(rtn.data);
    }else{
      defer.resolve();
    }
  });
  return defer;
}

export const getGalleryNotImage = function ({ dispatch }, id) {
  return new Promise((resolve) => {
    this.$http.get('/product/gallery/find', {id: id, image: false}).then((rtn) => {
      rtn = rtn && rtn.data || {};
      if(rtn.successed){
        dispatch(_type.GET_PRODUCT_CATEGORY, rtn.data);
      }
      resolve(rtn.data);
    });
  })
}

export const getGallerys = function ({ dispatch }) {
  var defer = $.Deferred();
  $.get('/product/gallery/list').success( (rtn) => {
    if(rtn.successed){
      defer.resolve(rtn.data);
    }else{
      defer.resolve();
    }
  });
  return defer;
}