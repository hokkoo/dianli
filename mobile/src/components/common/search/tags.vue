<template>
  <div class="tags">
    <checker :value.sync="selectedItem" type="checkbox" default-item-class="item" selected-item-class="selected">
      <checker-item :value="item.id" v-for="item in tags">{{item.title}}</checker-item>
    </checker>
  </div>
</template>

<script type="text/babel">
  import {Checker, CheckerItem} from '../../vux/checker';

  export default {
    props: {
      selectedItem: {
        type: Array,
        default: () => []
      },
      tags: {
        type: Array,
        default: () => []
      }
    },
  
    components: {
      Checker,
      CheckerItem
    }
  }
</script>
