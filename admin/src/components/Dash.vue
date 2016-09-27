<template>
  <div class="wrapper">
    <header class="main-header">
      <a href="/" class="logo">
        <!-- mini logo for sidebar mini 40x50 pixels -->
        <span class="logo-mini"><img src="/static/imgages/logo_sm.png" alt="Logo" class="img-responsive center-block"></span>
        <!-- logo for regular state and mobile devices -->
        <div class="container logo-lg">
          <div class="pull-left image"><img src="/static/imgages/logo_sm.png" alt="Logo" class="img-responsive"></div>
          <div class="pull-left info">管理</div>
        </div>
      </a>

      <!-- Header Navbar -->
      <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span class="sr-only">切换</span>
        </a>
        <!-- Navbar Right Menu -->
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <!-- 信息-->
            <li class="dropdown messages-menu">
              <dropdown>
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="fa fa-envelope-o"></i>
                  <span class="label label-success">{{ state.userInfo.messages | count }}</span>
                </a>
                <ul slot="dropdown-menu" class="dropdown-menu">
                  <li class="header">有 {{ state.userInfo.messages | count }} 条信息</li>
                  <li>
                    <a href="#">
                      <h4>
                        Support Team
                        <small><i class="fa fa-clock-o"></i> 5 mins</small>
                      </h4>
                      <!-- The message -->
                      <p>Why not buy a new awesome theme?</p>
                    </a>
                  </li>
                  <li class="footer"><a href="#">查看所有信息</a></li>
                </ul>
              </dropdown>
            </li>
            <!-- /.messages-menu -->
            <!-- User Account Menu -->
            <li class="dropdown user user-menu">
              <dropdown>
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  <!-- The user image in the navbar-->
                  <img v-bind:src=demo.avatar class="user-image" alt="User Image">
                  <!-- hidden-xs hides the username on small devices so only the image appears. -->
                  <span class="hidden-xs">{{ state.userInfo.name }}</span>
                </a>
                <ul slot="dropdown-menu" class="dropdown-menu">
                  <li><a href="/logout">退出</a></li>
                </ul>
              </dropdown>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">

      <!-- sidebar: style can be found in sidebar.less -->
      <section class="sidebar">

        <!-- Sidebar user panel (optional) -->
        <div class="user-panel">
          <div class="pull-left image">

          </div>
          <div class="pull-left info">
            <div>
              <p class="white">{{ demo.displayName }}</p>
            </div>
          </div>
        </div>

        <!-- search form (Optional) -->
        <form v-on:submit.prevent class="sidebar-form">
          <div class="input-group">
            <input type="text" name="search" id="search" class="search form-control" data-toggle="hideseek" placeholder="Search Menus" data-list=".sidebar-menu">
                <span class="input-group-btn">
                  <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                  </button>
                </span>
          </div>
        </form>
        <!-- /.search form -->

        <!-- 侧边栏，目前暂时支持一级菜单 -->
        <ul class="sidebar-menu">
          <li class="header">首页</li>
          <li class="active pageLink" v-on:click="toggleMenu"><a v-link="{path: '/'}"><i class="fa fa-desktop"></i><span class="page">首页</span></a></li>
          <li class="pageLink" v-on:click="toggleMenu"><a v-link="{path: '/tables'}"><i class="fa fa-table"></i><span class="page">报表</span></a></li>

          <li class="header">通讯录</li>
          <li class="pageLink" v-on:click="toggleMenu"><a v-link="{path: '/tasks'}"><i class="fa fa-tasks"></i><span class="page">联系人</span></a></li>

          <li class="header">产品</li>
          <li class="pageLink" v-on:click="toggleMenu"><a v-link="{path: '/access'}"><i class="fa fa-book"></i><span class="page">房门</span></a></li>
          <li class="pageLink" v-on:click="toggleMenu"><a v-link="{path: '/server'}"><i class="fa fa-hdd-o"></i><span class="page">洁具</span></a></li>
          <li class="pageLink" v-on:click="toggleMenu"><a v-link="{path: '/repos'}"><i class="fa fa-heart"></i><span class="page">窗户</span></a></li>

          <li class="header">门面</li>
          <li class="pageLink" v-on:click="toggleMenu"><a v-link="{path: '/login'}"><i class="fa fa-circle-o text-yellow"></i> <span class="page">店面信息</span></a></li>
        </ul>
        <!-- /.sidebar-menu -->
      </section>
      <!-- /.sidebar -->
    </aside>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1>
          {{$route.name }}
          <small>{{ $route.description }}</small>
        </h1>
        <ol class="breadcrumb">
          <li>
            <a href="#"><i class="fa fa-home"></i>Home</a>
          </li>
          <li class="active">{{$route.name | uppercase }}</li>
        </ol>
      </section>

      <router-view></router-view>
    </div>
    <!-- /.content-wrapper -->

    <!-- Main Footer -->
    <footer class="main-footer">
      <strong>Copyright &copy; {{year}} <a href="#">嘉利乐</a>.</strong> All rights reserved.
    </footer>
  </div>
  <!-- ./wrapper -->
</template>

<script>
require('hideseek')

module.exports = {
  name: 'Dash',
  data: function () {
    return {
      section: 'Dash',
      me: '',
      error: '',
      api: {
        servers: {
          url: '', // Back end server
          result: []
        }
      }
    }
  },
  computed: {
    store: function () {
      return this.$parent.$store
    },
    state: function () {
      return this.store.state
    },
    callAPI: function () {
      return this.$parent.callAPI
    },
    demo: function () {
      return {
        displayName: '123',
        avatar: 'http://i3.s1.dpfile.com/pc/476c36e1acb3086c887986f62f9fb7eb%28700x700%29/thumb.jpg',
        email: 'dxxx',
        randomCard: 123
      }
    }
  },
  methods: {
    changeloading: function () {
      this.store.dispatch('TOGGLE_SEARCHING')
    },
    toggleMenu: function (event) {
      // remove active from li
      window.$('li.pageLink').removeClass('active')

      // Add it to the item that was clicked
      event.toElement.parentElement.className = 'pageLink active'
    }
  },
  ready: function () {
    // Page is ready. Let's load our functions!
  }
}
</script>

<style>
.user-panel {
  height: 4em;
}
</style>
