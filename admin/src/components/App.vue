<template>
  <router-view></router-view>
  <div id="app"></div>
</template>

<script>
  import store from '../vuex/store.js'
  var dropdown = require('vue-strap').dropdown;

  if (window.localStorage) {
    if (store.state.user !== window.localStorage.getItem('user')) {
      store.dispatch('SET_USER', JSON.parse(window.localStorage.getItem('user')))
      store.dispatch('SET_TOKEN', window.localStorage.getItem('token'))
    }
  }

  export default {
    name: 'App',
    store: store,
    data: function () {
      return {
        caller: this.$http
      }
    },
    components:{
      dropdown
    },
    methods: {
      callAPI: function (method, url, data) {
        this.callingAPI = true
        url = url || this.serverURI // if no url is passed then inheret local server URI
        return this.caller({
          url: url,
          method: method,
          data: data
        })
      },
      logout: function () {
        this.$store.dispatch('SET_USER', null)
        this.$store.dispatch('SET_TOKEN', null)

        if (window.localStorage) {
          window.localStorage.setItem('user', null)
          window.localStorage.setItem('token', null)
        }

        this.$router.go('/login')
      }
    }
  }
</script>
