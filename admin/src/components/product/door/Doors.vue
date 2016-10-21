<template>
  <div class="doors col-xs-12">
    <button type="button" class="btn btn-primary" v-link="{ name: 'productDoorEdit'}">创建</button>
    <v-list url="/product/door/list" :param.sync="param" :items.sync="items" v-ref:list>
      <ul class="list">
        <li v-for="item in items" class="item">
          <a v-link="{ name: 'productDoorDetail', params: {id: item.id}}">
            <p class="title">{{item.name}}</p>
            <p class="desc">{{item.desc}}</p>
          </a>
        </li>
      </ul>
    </v-list>
  </div>
</template>

<script type="text/babel">
  import {getDoors} from '../../../vuex/modules/product/door/action.js';
  import vList from '../../common/bootstrap/v-list.vue';

  export default {
    data: () => {
      return {
        items: []
      }
    },
    vuex: {
      actions: {
        getList: getDoors
      }
    },
    components: {
      vList
    },
    created(){
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
