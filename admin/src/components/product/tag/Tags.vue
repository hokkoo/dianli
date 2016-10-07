<template>
  <h3 class="title">
    标签管理
  </h3>
  <div class="tags">
    <ul>
      <li class="item" v-for=""></li>
    </ul>
  </div>
</template>

<script type="text/babel">
  import {tags} from '../../../vuex/modules/product/tag/getter.js';
  import {getTags} from '../../../vuex/modules/product/tag/action.js';

  export default {
    vuex: {
      getters: {
        item: tag
      },
      actions: {
        getItem: getTags
      }
    },
    components: {
    },
    created(id){
      this.getTags().then( () => {

      })
    },
    ready(){
      console.log(this.$el);
    }
  }
</script>
