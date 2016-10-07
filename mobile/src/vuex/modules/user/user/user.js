import {GET_USER_USER, GET_USER_TOKEN} from '../../../mutation-types.js'

const state = {
  user: {},
  role: {},
  token: ''
}

const mutations = {

  [GET_USER_USER] (state, data) {
    state.user = data;
  },
  [GET_USER_TOKEN] (state, data) {
    state.token = data;
  }
}

export default {
  state,
  mutations
}
