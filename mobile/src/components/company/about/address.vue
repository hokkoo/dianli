<template>
  <div class="address">
    <location></location>
  </div>
</template>

<script type="text/babel">
  import Card from '../../vux/card';
  import {getAboutUsData} from '../../../vuex/modules/company/about/action.js';
  import getObject from '../companyProcessor.js';
  import Location from '../../common/map/location.vue';

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
      Location
    },
    created(){
      this.getAboutUsData().then( (data) => {
        _.extend(this.item, data);
      });
    }
  }
</script>

<style>

.company > .address {
  position: relative;
}
</style>
