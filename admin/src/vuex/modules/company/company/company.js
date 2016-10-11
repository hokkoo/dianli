import {GET_COMPANY, GET_COMPANYS} from '../../../mutation-types.js';
// TODO需要嵌套在products之下
const state = {
  company: {},
  list: []
}

const mutations = {

  [GET_COMPANY] (state, data) {
    state.company = data
  },
  [GET_COMPANYS] (state, data) {
    state.list = data
  }
}

export default {
  state,
  mutations
}
