<template>
  <router-view></router-view>
  <div id="app"></div>
</template>

<script>

  export default {
    name: 'App'
  }
</script>
<style>
  .content{
    position: relative;
  }
  .clearfix:after,
.clearfix:before{
	display: table;
	content: " "
}
.clearfix:after{
	clear: both
}
</style>