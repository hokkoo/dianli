// Import System requirements
// import Vue from 'vue'
import '../assets/lib/vue/1.0.24/vue.js';
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
import productDoorEditView from './components/product/door/DoorEdit.vue';

import ProductTagsView from './components/product/tag/Tags.vue';
import ProductCategorysView from './components/product/category/Categorys.vue';

import ContactHomeView from './components/contact/Index.vue';
import ContactsView from './components/contact/contact/Contacts.vue';

import ProductGallerysView from './components/product/gallery/Gallerys.vue';
import ProductGalleryDetailView from './components/product/gallery/Gallery.vue';

import CompanyHomeView from './components/company/Index.vue';
import CompanysView from './components/company/company/Companys.vue';
import CompanyDetailView from './components/company/company/Company.vue';
import CompanyEditView from './components/company/company/CompanyEdit.vue';


import AboutUsHomeView from './components/company/AboutLayout.vue';
import AboutUsDetailView from './components/company/about/About.vue';
import AboutUsEditView from './components/company/about/AboutEdit.vue';

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
  '/admin/login': {
    component: LoginView
  },
  '/admin/': {
    component: DashView,
    auth: true,
    subRoutes: {
      '': {
        component: HomeView,
        name: '首页',
        description: '首页'
      },

      '/about': {
        component: AboutUsHomeView,
        auth: true,
        subRoutes: {
          '': {
            component: AboutUsHomeView,
            name: '门店信息',
            description: '门店信息管理'
          },
          '/about': {
            component: AboutUsDetailView,
            name: 'aboutDetail',
            description: 'aboutDetail'
          },
          '/edit': {
            component: AboutUsEditView,
            name: 'aboutUsEdit',
            description: '编辑'
          }
        }
      },
      '/company': {
        component: CompanyHomeView,
        auth: true,
        subRoutes: {
          '': {
            component: CompanyHomeView,
            name: '联系人管理',
            description: '联系人管理'
          },
          '/companys': {
            component: CompanysView,
            name: 'companys',
            description: '公司列表'
          },
          '/company/:id': {
            component: CompanyDetailView,
            name: 'companyDetail',
            description: '公司'
          },
           '/company/create': {
            component: CompanyEditView,
            name: 'companyCreate',
            description: '公司'
          },
          '/company/edit/:id': {
            component: CompanyEditView,
            name: 'companyEdit',
            description: '公司'
          }
        }
      },
      '/contact': {
        component: ProductHomeView,
        auth: true,
        subRoutes: {
          '': {
            component: ProductHomeView,
            name: '联系人管理',
            description: '联系人管理'
          },
          '/contacts': {
            component: ContactsView,
            name: 'contactList',
            description: '联系人列表'
          }
        }
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
            name: 'productDoors',
            description: '门列表'
          },
          '/door/:id': {
            component: ProductDoorView,
            name: 'productDoorDetail',
            description: '门'
          },
          '/door/edit/:id': {
            component: productDoorEditView,
            name: 'productDoorEdit',
            description: '门'
          },
          '/tags': {
            component: ProductTagsView,
            name: '标签',
            description: '标签'
          },
          '/categorys': {
            component: ProductCategorysView,
            name: '类别',
            description: '类别'
          },
          '/gallerys': {
            component: ProductGallerysView,
            name: '图库',
            description: '图库'
          },
          '/gallery/:id': {
            component: ProductGalleryDetailView,
            name: 'galaryDetail',
            description: '图库详情'
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
/*router.beforeEach(function (transition) {
  // window.console.log('Transition', transition)
  if (transition.to.auth && (transition.to.router.app.$store.state.token === 'null')) {
    window.console.log('Not authenticated')
    transition.redirect('/login')
  } else {
    transition.next()
  }
})*/

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
