<template>
  <group>
    <search @on-search="onSearch"></search>
  </group>
  <div class="doors">
    <list url="/product/door/list" :items.sync="listDoors" height="300px">
      <slot>
        <li class="list-item" v-for="item in listDoors">
          <card v-link="{name: 'productDoorDetail', params: {id: item.id}}">
            <div slot="content" class="card-padding">
              <p style="color:#999;font-size:12px;">{{item.createdAt}}</p>
              <p style="font-size:14px;line-height:1.2;">{{item.title}}</p>
            </div>
          </card>
        </li>
      </slot>
    </list>
  </div>
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
  import search from './Search.vue';
  import List from '../../common/pager/list.vue';

  export default {
    data: () => {
      return {
        listDoors: []
      }
    },
    vuex: {
      getters: {
        items: doors
      },
      actions: {
        getDoors: getDoors
      }
    },
    methods: {
      onSearch(param){
        this.getDoors({
          param: param
        });
      }
    },
    components: {
      Card,
      Group,
      search,
      List
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
