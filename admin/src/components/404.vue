<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <img src="/static/img/logo.png" class="center-block logo">
          <div class="text-center col-sm-6 col-sm-offset-3">
            <h1>404.</h1>
            <h4>页面不存在.</h4>
            <a v-link="{ path: '/'}">返回.</a>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  export default {
    name: 'NotFound'
  }
</script>

<style>
</style>
