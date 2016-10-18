<template>
  <div class="address">
    <card>
      <div slot="content" class="card-padding">
        123
      </div>
    </card>
  </div>
</template>

<script type="text/babel">
  import Card from '../../vux/card';
  import {getAboutUsData} from '../../../vuex/modules/company/about/action.js';
  import getObject from '../companyProcessor.js';

  export default {
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
    components: {
      Card,
      Tab,
      TabItem,
      List,
      Dialog
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
