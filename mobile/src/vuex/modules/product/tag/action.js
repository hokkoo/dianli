import { API_ROOT } from '../../../../config/config.js';
import * as _type from '../../../mutation-types.js';
import server from '../../../server.js';

// 获取数据列表
export const getHomeHots = function ({ dispatch }, type) {
  $.get('/product/tag/list?type=' + (type || '')).success(function (rtn) {
    dispatch(_type.GET_PRODUCT_TAGS, rtn);
  });
}