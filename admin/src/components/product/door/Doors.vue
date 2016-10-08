<template>
  <div class="doors col-xs-12">
    <button type="button" class="btn btn-primary" v-link="{ name: 'productDoorEdit'}">创建</button>
    <ul class="list">
      <li v-for="item in items" class="item">
        <a v-link="{ name: 'productDoorDetail', params: {id: item.id}}" v-if="item.name">
          <p class="title">{{item.name}}</p>
          <p class="list-content">{{item.desc}}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script type="text/babel">
  import {doors} from '../../../vuex/modules/product/door/getter.js';
  import {getDoors} from '../../../vuex/modules/product/door/action.js';

  export default {
    vuex: {
      getters: {
        items: doors
      },
      actions: {
        getList: getDoors
      }
    },
    created(){
      this.getList();
    }
  }
</script>

<style>
  .doors .list .item {
    margin-bottom: 20px;
    border-bottom: 1px solid #eeeeee;
}

.doors .list .title {
    color: #333;
    font-size: 16px;
    margin-bottom: 4px;
}

.doors .list .list-content {
    font-size: 12px;
    color: #999;
}

.doors .list {
    margin-top: 20px;
}

.product > .doors {
    margin-top: 20px;
}
</style>
