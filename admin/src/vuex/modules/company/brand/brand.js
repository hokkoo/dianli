import {GET_COMPANY_BRAND, GET_COMPANY_BRANDS} from '../../../mutation-types.js';
// TODO需要嵌套在products之下
const state = {
  brand: {},
  list: []
}

const mutations = {

  [GET_COMPANY_BRAND] (state, data) {
    state.brand = data
  },
  [GET_COMPANY_BRANDS] (state, data) {
    state.list = data
  }
}

export default {
  state,
  mutations
}
