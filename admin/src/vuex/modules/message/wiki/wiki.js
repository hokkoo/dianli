import {GET_MESSAGE_WIKI, GET_MESSAGE_WIKIS} from '../../../mutation-types.js';
// TODO需要嵌套在products之下
const state = {
  wiki: {},
  list: []
}

const mutations = {

  [GET_MESSAGE_WIKI] (state, data) {
    state.wiki = data
  },
  [GET_MESSAGE_WIKIS] (state, data) {
    state.list = data
  }
}

export default {
  state,
  mutations
}
