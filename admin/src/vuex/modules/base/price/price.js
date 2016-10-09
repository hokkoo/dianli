import {GET_PRODUCT_CONTACT, GET_PRODUCT_CONTACTS} from '../../../mutation-types.js';
// TODO需要嵌套在products之下
const state = {
  contact: {},
  contacts: []
}

const mutations = {
  [GET_PRODUCT_CONTACT] (state, data) {
    state.contact = data
  },
  [GET_PRODUCT_CONTACTS] (state, data) {
    state.contacts = data
  }
}

export default {
  state,
  mutations
}
