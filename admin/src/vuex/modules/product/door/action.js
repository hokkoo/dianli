import { API_ROOT } = from '../../../../config/config.js';
import * as _type from '../../../mutation-types.js';

// 获取数据列表
export const getDoors = function ({ dispatch }, pager) {
  console.log(123);
 /* this.$http.get(API_ROOT + '/product/door/list').then(rtn => {
    dispatch(types.GET_PRODUCT_DOORS, JSON.parse(rtn.body))
  }, error => {
    dispatch(types.GET_ARTICLE_FAILURE, error)
  });*/
  setTimeout(function () {
    dispatch(types.GET_PRODUCT_DOORS, [
      {
        name: '1a',
        content: 'dxx'
      },
      {
        name: '2a',
        content: 'dxxx'
      }
    ]);
    console.log(222);
  }, 1000);
}

export const getDoor = function ({ dispatch }, id) {
  console.log(12344);
 /* this.$http.get(API_ROOT + '/product/door/list').then(rtn => {
    dispatch(types.GET_PRODUCT_DOORS, JSON.parse(rtn.body))
  }, error => {
    dispatch(types.GET_ARTICLE_FAILURE, error)
  });*/
  setTimeout(function () {
    dispatch(types.GET_PRODUCT_DOOR, {
      name: '1a',
      content: 'dxx'
    });
    console.log(22244);
  }, 1000);
}