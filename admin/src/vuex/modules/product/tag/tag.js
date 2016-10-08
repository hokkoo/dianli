import {GET_PRODUCT_TAG, GET_PRODUCT_TAGS} from '../../../mutation-types.js';
// TODO需要嵌套在products之下
const state = {
  tag: {},
  list: []
}

const mutations = {

  [GET_PRODUCT_TAG] (state, data) {
    state.tag = data
  },
  [GET_PRODUCT_TAGS] (state, data) {
    state.list = data;
  }
}

export default {
  state,
  mutations
}
