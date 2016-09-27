import { API_ROOT } from '../../../../config/config.js';
import * as _type from '../../../mutation-types.js';

// 获取数据列表
export const getDoors = function ({ dispatch }, pager) {
  console.log(123);
 /* this.$http.get(API_ROOT + '/product/door/list').then(rtn => {
    dispatch(types.GET_PRODUCT_DOORS, JSON.parse(rtn.body))
  }, error => {
    dispatch(types.GET_ARTICLE_FAILURE, error)
  });*/
  $.get('/product/door/list').success(function (rtn) {
    dispatch(_type.GET_PRODUCT_DOORS, rtn);
  });
}

export const getDoor = function ({ dispatch }, id) {
  console.log(12344);
 /* this.$http.get(API_ROOT + '/product/door/list').then(rtn => {
    dispatch(types.GET_PRODUCT_DOORS, JSON.parse(rtn.body))
  }, error => {
    dispatch(types.GET_ARTICLE_FAILURE, error)
  });*/
  setTimeout(function () {
    dispatch(_type.GET_PRODUCT_DOOR, {
      name: '1a',
      content: 'dxx'
    });
    console.log(22244);
  }, 1000);
}