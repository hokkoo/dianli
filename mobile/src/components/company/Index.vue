<template>
  <div class="about-us">
    <group title="店面名称">
      <cell title="厦门嘉利乐工贸有限公司" link="/mobile/about/about"></cell>
    </group>
    <group title="联系电话">
      <cell title="何保仲" link="tel:13850052109" value="13850052109"></cell>
      <cell title="柯琼" link="tel:0592-7115989" value="0592-7115989"></cell>
    </group>
    <group title="地址">
      <cell title="西柯滨海街" link="/company/about/address"></cell>
    </group>
    <group title="留言">
      <cell title="请留言" link="/company/about/message"></cell>
    </group>
  </div>
</template>
<script>
  import {Tab,TabItem} from '../vux/tab';
  import Card from '../vux/card';
  import Group from '../vux/group';
  import Cell from '../vux/cell';

  export default {
    name: 'AboutUs',
    components:{
      Card,
      Cell,
      Group
    }
  }
</script>

<style>
</style>
