import Vue from 'vue'
import Vuex from 'vuex'
import door from './modules/product/door/door.js'
import user from './modules/user/user/user.js';
import userInfo from './modules/user/userInfo/userInfo.js'
import tag from './modules/product/tag/tag.js';
import category from './modules/product/category/category.js';
import hotHome from './modules/hot/home/home.js';

Vue.use(Vuex)
Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

const state = {
  isLoading: false,
  direction: 'forward'
}


export default new Vuex.Store({
  strict: debug,
  modules: {
    door,
    user,
    userInfo,
    tag,
    category,
    hotHome
  },
  state,
  mutations: {
    UPDATE_LOADING (state, status) {
      state.isLoading = status
    },
    UPDATE_DIRECTION (state, direction) {
      state.direction = direction
    }
  }
});
