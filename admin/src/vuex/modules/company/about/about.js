import {GET_COMPANY_ABOUT} from '../../../mutation-types.js';
const state = {
  about: {}
}

const mutations = {

  [GET_COMPANY_ABOUT] (state, data) {
    state.about = data
  }

export default {
  state,
  mutations
}
