import {GET_PRODUCT_GALLERY, GET_PRODUCT_GALLERYS} from '../../../mutation-types.js';
// TODO需要嵌套在products之下
const state = {
  gallery: {},
  gallerys: []
}

const mutations = {
  [GET_PRODUCT_CONTACT] (state, data) {
    state.gallery = data
  },
  [GET_PRODUCT_CONTACTS] (state, data) {
    state.gallery = data
  }
}

export default {
  state,
  mutations
}
