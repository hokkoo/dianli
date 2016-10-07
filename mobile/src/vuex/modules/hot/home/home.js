import {GET_HOT_HOMES} from '../../../mutation-types.js';
// TODO需要嵌套在products之下
const state = {
  hots: {}
}

const mutations = {

  [GET_HOT_HOMES] (state, data) {
    console.log(12);
    console.log(data)
    state.hots = data
  }
}

export default {
  state,
  mutations
}
