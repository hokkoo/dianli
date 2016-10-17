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
ul{
  padding: 0;
}
li{
  list-style: none;
}
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
.vux-checker-item {
    margin: 4px;
    border: 1px solid #fff;
    padding: 2px 6px;
}

.vux-checker-item.selected {
    border-color: #38bc9c;
    background-color: #38bc9c;
    color: #fff;
}
.list-item img {
    width: 80%;
    margin: 10% 10% 0;
}
.list-item {
    font-size: 14px;
}
</style>