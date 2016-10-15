import Router from 'vue-router'
var VueResource = require('vue-resource');

// plugins
import Device from './plugins/device'
import ToastPlugin from './plugins/toast'
import AlertPlugin from './plugins/alert'

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(Router)
Vue.config.devtools = true
Vue.use(VueResource);

// $device
Vue.use(Device)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)

const router = new Router({
  transitionOnLoad: false,
  history: true,
  saveScrollPosition: true
})

/**
* sync router params
*/
import { sync } from 'vuex-router-sync'
import store from './vuex/store'

let history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

/**
* sync router loading status
*/
const commit = store.commit || store.dispatch
router.beforeEach(({ to, from, next }) => {
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  if (toIndex) {
    if (toIndex > fromIndex) {
      commit('UPDATE_DIRECTION', 'forward')
    } else {
      commit('UPDATE_DIRECTION', 'reverse')
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    commit('UPDATE_DIRECTION', 'forward')
  }
  commit('UPDATE_LOADING', true)
  setTimeout(next, 50)
})
router.afterEach(() => {
  commit('UPDATE_LOADING', false)
})

sync(store, router)

import HomeView from './Home.vue'
import AppView from './App.vue'
import LayoutView from './Layout.vue'
import ProductHomeView from './components/product/Index.vue';
import ProductLayout from './components/product/Layout.vue';
import DoorsView from './components/product/door/Doors.vue';
import DoorsDetailView from './components/product/door/Door.vue';

router.map({
  '/mobile/': {
    component: LayoutView,
    auth: true,
    subRoutes: {
      '': {
        component: HomeView,
        name: '首页',
        description: '首页'
      },
      "/product": {
        component: ProductLayout,
        subRoutes: {
          '': {
            component: ProductHomeView,
            name: '首页',
            description: '首页'
          },
          "/doors": {
            component: DoorsView,
            name: '门',
            description: '门'
          },
          "/door/:id": {
            component: DoorsDetailView,
            name: 'productDoorDetail',
            description: '门'
          }
        }
      }
    }
  }
})


// save position for demo page
let demoScrollTop = 0
function saveDemoScrollTop () {
  demoScrollTop = window.scrollY
}

router.beforeEach(function (transition) {
  if (transition.to.fullPath !== '/demo') {
    window.removeEventListener('scroll', saveDemoScrollTop, false)
  }
  if (/\/http/.test(transition.to.path)) {
    let url = transition.to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    if (/\/demo\/component\/\w+/.test(transition.to.path)) {
      router.go({
        replace: true,
        path: transition.to.path.replace('/demo', ''),
        append: false
      })
    } else {
      transition.next()
    }
  }
})

router.afterEach(function (transition) {
  if (transition.to.path !== '/demo') {
    window.scrollTo(0, 0)
  } else {
    window.removeEventListener('scroll', saveDemoScrollTop, false)
    // if from component page
    if (demoScrollTop && /component/.test(transition.from.path)) {
      setTimeout(function () {
        window.scrollTo(0, demoScrollTop)
      }, 100)
    }
    setTimeout(function () {
      window.addEventListener('scroll', saveDemoScrollTop, false)
    }, 1000)
  }
})

router.start(AppView, '#root')
