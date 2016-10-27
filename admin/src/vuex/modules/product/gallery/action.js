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
  $.post('/product/gallery/addImage', param).success( (rtn) => {
    if(rtn.successed){
      defer.resolve(rtn.data);
    }else{
      defer.resolve();
    }
  });
  return defer;
}

export const deleteImage = function ({ dispatch }, item) {
  let param = _.extend({}, item);
  param = {item: param};
  var defer = $.Deferred();
  $.post('/product/gallery/deleteImage', param).success( (rtn) => {
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