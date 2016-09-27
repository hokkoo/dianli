import {GET_USER_MESSAGE} from '../../../mutation-types.js'

const state = {
  messages: []
}

const mutations = {

  [GET_USER_MESSAGE] (state, data) {
    state.messages = data;
  }
}

export default {
  state,
  mutations
}
