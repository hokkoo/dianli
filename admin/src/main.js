// Import System requirements
import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'

// Import Helpers for filters
import { domain, count, prettyDate, pluralize } from './filters'

// Import Views - Top level
import AppView from './components/App.vue'
import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import HomeView from './components/Home.vue'
import ProductHomeView from './components/product/Index.vue';
import ProductDoorsView from './components/product/door/Doors.vue';
import ProductDoorView from './components/product/door/Door.vue';


// Import Install and register helper items
Vue.use(Router)
Vue.filter('count', count)
Vue.filter('domain', domain)
Vue.filter('prettyDate', prettyDate)
Vue.filter('pluralize', pluralize)

// Routing logic
var router = new Router({
  history: true,
  saveScrollPosition: true
})

// Routes
router.map({
  '/login': {
    component: LoginView
  },
  '/': {
    component: DashView,
    auth: true,
    subRoutes: {
      '': {
        component: HomeView,
        name: '首页',
        description: '首页'
      },
      '/product': {
         component: ProductHomeView,
         auth: true,
         subRoutes: {
          '': {
            component: ProductHomeView,
            name: '产品首页',
            description: '产品首页'
          },
          '/doors': {
            component: ProductDoorsView,
            name: '门列表',
            description: '门列表'
          },
          '/door/:id': {
            component: ProductDoorView,
            name: 'productDoorDetail',
            description: '门'
          }
        }
      }
    }
  },
  // not found handler
  '*': {
    component: NotFoundView
  }
})

// Redirect for shortcuts
router.redirect({
  '/jobs': '/user/jobs',
  '/me': '/user'
})

// Some middleware to help us ensure the user is authenticated.
router.beforeEach(function (transition) {
  // window.console.log('Transition', transition)
  if (transition.to.auth && (transition.to.router.app.$store.state.token === 'null')) {
    window.console.log('Not authenticated')
    transition.redirect('/login')
  } else {
    transition.next()
  }
})

// Resource logic
Vue.use(Resource)

Vue.http.interceptors.push({
  request: function (request) {
    /*
      Enable this when you have a backend that you authenticate against
    var headers = request.headers

    if (window.location.pathname !== '/login' && !headers.hasOwnProperty('Authorization')) {
      headers.Authorization = this.$store.state.token
    }
    */
    // console.log(headers)
    return request
  },
  response: function (response) {
    return response
  }
})

// Start out app!
Vue.config.debug = true
router.start(AppView, '#root')
