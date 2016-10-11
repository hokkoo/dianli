<template>
  <div class="companys col-xs-12">
    <a class="btn btn-primary" v-link="{name:'companyCreate'}">创建</a>
    <ul class="list">
      <li v-for="item in items" class="item">
        <a v-link="{ name: 'companyDetail', params: {id: item.id}}" v-if="item.name">
          <p class="title">{{item.name}}</p>
          <p class="list-content">{{item.desc}}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script type="text/babel">
  import {companys} from '../../../vuex/modules/company/company/getter.js';
  import {getCompanys} from '../../../vuex/modules/company/company/action.js';

  export default {
    data: function () {
      return {
        items: []
      }
    },
    vuex: {
      actions: {
        getCompanys: getCompanys
      }
    },
    created(){
      var _self = this;
      this.getCompanys().then( (data) => {
        _.each(data, (item) => {
          _self.items.push(item);
        });
      })
    }
  }
</script>

<style>

</style>
