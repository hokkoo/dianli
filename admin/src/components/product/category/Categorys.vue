<template>
  <div class="categorys col-xs-12">
    <h3 class="title">
      类别管理
    </h3>
    <div class="card door col-xs-12 col-md-8">
      <h3 class="title">门</h3>
      <category-sub-tree :type="1" :enable-edit="true"></category-sub-tree>
    </div>
  </div>
</template>

<script type="text/babel">
  import {tags} from '../../../vuex/modules/product/tag/getter.js';
  import {getTags} from '../../../vuex/modules/product/tag/action.js';
  import categorySubTree from '../../common/category-sub-tree.vue';

  export default {
    data: () => {
      return {
        doorCategorys: []
      }
    },
    vuex: {
      actions: {
        getTags: getTags
      }
    },
    components: {
      categorySubTree
    },
    created(id){
    }
  }
</script>
<style type="text/css">
.categorys .door .normal-state {
    display: inline-block;
}

.categorys .door .category-sub-tree-item {
    padding: 6px 0;
    border-bottom: 1px solid #d4d4d4;
}
</style>
