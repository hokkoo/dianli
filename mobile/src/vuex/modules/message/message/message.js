import {GET_MESSAGE_MESSAGE, GET_MESSAGE_MESSAGES} from '../../../mutation-types.js';
// TODO需要嵌套在products之下
const state = {
  list: [],
  message: {}
}

const mutations = {

  [GET_MESSAGE_MESSAGES] (state, data) {
    state.list = data
  },
  [GET_MESSAGE_MESSAGE] (state, data) {
    state.message = data
  }
}

export default {
  state,
  mutations
}
