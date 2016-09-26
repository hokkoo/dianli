import Vue from 'vue'
import Vuex from 'vuex'
import door from './modules/product/door/door.js'
import user from './modules/user/user/user.js';
import userInfo from './modules/user/userInfo/userInfo.js'

Vue.use(Vuex)
Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  modules: {
    door,
    user,
    userInfo
  }
});
