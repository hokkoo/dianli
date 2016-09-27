<template>
  <div class="list-wrapper product">
    <div class="detail">
      <p class="list-title">{{item.name}}</p>
      <p class="list-content">{{item.content}}</p>
    </div>
  </div>
</template>

<script type="text/babel">
  import {door} from '../../../vuex/modules/product/door/getter.js';
  import {getDoor} from '../../../vuex/modules/product/door/action.js';

  export default {
    vuex: {
      getters: {
        item: door
      },
      actions: {
        getItem: getDoor
      }
    }
  }
</script>
