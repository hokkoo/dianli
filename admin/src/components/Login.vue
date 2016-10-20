<template>
  <div class="container container-table">
      <spinner v-ref:spinner size="md" fixed text="加载中..."></spinner>
      <div class="row vertical-10p">
        <div class="container">
          <img src="/static/img/logo.png" class="center-block logo">
          <div class="text-center col-md-4 col-sm-offset-4">
            <!-- errors -->
            <div v-if=response class="text-red"><p>{{response  | capitalize }}</p></div>

            <!-- login form -->
            <form class="ui form loginForm"  @submit.prevent="login">

              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                <input class="form-control" name="username" placeholder="Username" type="text" v-model="item.name">
              </div>

              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                <input class="form-control" name="password" placeholder="Password" type="password" v-model="item.password">
              </div>
              <div class="input-group">
                <div class="alert alert-danger" v-show="error">{{error}}</div>
              </div>
              <button type="submit" class="btn btn-primary btn-lg ">登录</button>
              
            </form>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {login} from '../vuex/modules/user/user/action.js';
import {user} from '../vuex/modules/user/user/getter.js';
import {spinner} from 'vue-strap';
module.exports = {
  name: 'Login',
  data: function () {
    return {
      item: {
        name: '',
        password: ''
      },
      error: ''
    }
  },
   vuex: {
    getters: {
      user: user
    },
    actions: {
      _login: login
    }
  },
  components: {
    spinner
  },
  methods: {
    login(){
      this.$refs.spinner.show();
      this._login(this.item).then((data) => {
        this.$refs.spinner.hide();
        if(data && data.successed){
          this.$router.go('productDoors');
        }else{
          this.error = data && data.message;
        }
      })
    }
  }
}
</script>

<style>
html, body, .container-table {
  height: 100%;
  background-color: #282B30 !important;
}
.container-table {
    display: table;
    color: white;
}
.vertical-center-row {
    display: table-cell;
    vertical-align: middle;
}
.vertical-20p {
  padding-top: 20%;
}
.vertical-10p {
  padding-top: 10%;
}
.logo {
  width: 15em;
  padding: 3em;
}
.loginForm .input-group {
  padding-bottom: 1em;
  height: 4em;
}
.input-group input {
  height: 4em;
}
</style>
