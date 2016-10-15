<template>
  <group>
    <door-category :type="1" :enable-edit="false"></door-category>
  </group>
  <group>
    <div class="doors">
      <card v-for="item in items" v-link="{name: 'productDoorDetail', params: {id: item.id}}">
        <img slot="header" v-bind:src="item.images && item.images[0] && item.images[0].url" v-if="item.images"/>
        <div slot="content" class="card-padding">
          <p style="color:#999;font-size:12px;">{{item.createdAt}}</p>
          <p style="font-size:14px;line-height:1.2;">{{item.title}}</p>
        </div>
      </card>
    </div>
  </group>
</template>

<script type="text/babel">
  import {doors} from '../../../vuex/modules/product/door/getter.js';
  import {getDoors} from '../../../vuex/modules/product/door/action.js';
  import { Card, Group } from '../../vux';
  import doorCategory from './DoorCategory.vue';

  export default {
    vuex: {
      getters: {
        items: doors
      },
      actions: {
        getDoors: getDoors
      }
    },
    components: {
      Card,
      Group,
      doorCategory
    },
    created(){
      this.getDoors();
    }
  }
</script>

<style>
.product .doors img {
    width: 80%;
    margin: 10%;
    border: 1px solid #e1e1e1;
}
</style>
