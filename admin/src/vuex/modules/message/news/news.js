import {GET_MESSAGE_NEWS, GET_MESSAGE_NEWSS} from '../../../mutation-types.js';
// TODO需要嵌套在products之下
const state = {
  news: {},
  list: []
}

const mutations = {

  [GET_MESSAGE_NEWS] (state, data) {
    state.news = data
  },
  [GET_MESSAGE_NEWSS] (state, data) {
    state.list = data
  }
}

export default {
  state,
  mutations
}
