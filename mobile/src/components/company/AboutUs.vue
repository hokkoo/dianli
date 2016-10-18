<template>
  <div class="about-us">
    <group title="店面名称">
      <cell :title="item.title" link="/mobile/about/about"></cell>
    </group>
    <group title="联系电话">
      <cell title="何保仲" link="tel:13850052109" value="13850052109"></cell>
      <cell title="柯琼" link="tel:0592-7115989" value="0592-7115989"></cell>
    </group>
    <group title="地址">
      <cell :title="item.address" link="/mobile/about/address"></cell>
    </group>
    <group title="留言">
      <cell title="请留言" link="/mobile/about/message"></cell>
    </group>
  </div>
</template>
<script>
  import {Tab,TabItem} from '../vux/tab';
  import Card from '../vux/card';
  import Group from '../vux/group';
  import Cell from '../vux/cell';
  import {getAboutUsData} from '../../vuex/modules/company/about/action.js';
  import getObject from './companyProcessor.js';

  export default {
    name: 'AboutUs',
    data: () => {
      return {
        item: getObject()
      }
    },
    vuex: {
      actions: {
        getAboutUsData: getAboutUsData
      }
    },
    components:{
      Card,
      Cell,
      Group
    },
    created(){
      this.getAboutUsData().then( (data) => {
        _.extend(this.item, data);
      });
    }
  }
</script>

<style>
</style>
