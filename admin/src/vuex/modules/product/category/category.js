import {GET_PRODUCT_CATEGORY, GET_PRODUCT_CATEGORYS, GET_PRODUCT_CATEGORY_TREE, GET_PRODUCT_CATEGORY_SUBTREE} from '../../../mutation-types.js';
// TODO需要嵌套在products之下
const state = {
  catetory: {},
  list: [],
  tree:  {},
  subTree: {}
}

const mutations = {

  [GET_PRODUCT_CATEGORY_TREE] (state, data) {
    state.tree = data
  },
  [GET_PRODUCT_CATEGORY_SUBTREE] (state, data) {
    state.subTree = data
  },
  [GET_PRODUCT_CATEGORY] (state, data) {
    state.catetory = data
  },
  [GET_PRODUCT_CATEGORYS] (state, data) {
    console.log('111');
    state.list = data;
  }
}

export default {
  state,
  mutations
}
