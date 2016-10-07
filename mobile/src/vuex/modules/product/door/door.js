import {GET_PRODUCT_DOOR, GET_PRODUCT_DOORS} from '../../../mutation-types.js';
// TODO需要嵌套在products之下
const state = {
  door: {images:[]},
  list: []
}

const mutations = {

  [GET_PRODUCT_DOOR] (state, data) {
    state.door = data
  },
  [GET_PRODUCT_DOORS] (state, data) {
    state.list = data
  }
}

export default {
  state,
  mutations
}
