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

import BrandDetailView from './components/company/brand/Brand.vue';
import BrandsView from './components/company/brand/Brands.vue';
import BrandEditView from './components/company/brand/BrandEdit.vue';


import AboutUsHomeView from './components/company/AboutLayout.vue';
import AboutUsDetailView from './components/company/about/About.vue';
import AboutUsEditView from './components/company/about/AboutEdit.vue';

import MessageHomeView from './components/message/Index.vue';
import NewsDetailView from './components/message/news/News.vue';
import NewssView from './components/message/news/Newss.vue';
import NewsEditView from './components/message/news/NewsEdit.vue';

import WikiDetailView from './components/message/wiki/Wiki.vue';
import WikisView from './components/message/wiki/Wikis.vue';
import WikiEditView from './components/message/wiki/WikiEdit.vue';

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
      '/message': {
        component: MessageHomeView,
        auth: true,
        subRoutes: {
          '/newss': {
            component: NewssView,
            name: 'newss',
            description: '新闻列表'
          },
          '/news/edit/:id': {
            component: NewsEditView,
            name: 'newsEdit',
            description: '编辑'
          },
          '/news/create': {
            component: NewsEditView,
            name: 'newsCreate',
            description: '创建'
          },
          '/news/:id': {
            component: NewsDetailView,
            name: 'newsDetail',
            description: '详情'
          },
          '/wikis': {
            component: WikisView,
            name: 'wikis',
            description: '百科列表'
          },
          '/wiki/edit/:id': {
            component: WikiEditView,
            name: 'wikiEdit',
            description: '编辑'
          },
          '/wiki/create': {
            component: WikiEditView,
            name: 'wikiCreate',
            description: '创建'
          },
          '/wiki/:id': {
            component: WikiDetailView,
            name: 'wikiDetail',
            description: '详情'
          }
        }
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
          },
          '/brands': {
            component: BrandsView,
            name: 'brands',
            description: '品牌列表'
          },
          '/brand/:id': {
            component: BrandDetailView,
            name: 'brandDetail',
            description: '品牌'
          },
           '/brand/create': {
            component: BrandEditView,
            name: 'brandCreate',
            description: '品牌'
          },
          '/brand/edit/:id': {
            component: BrandEditView,
            name: 'brandEdit',
            description: '品牌'
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
