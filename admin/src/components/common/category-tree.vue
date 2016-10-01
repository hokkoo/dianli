<template>
  <ul class="category-tree">
    <category-tree-item :type="type" :item="categoryTree" :selected-item.sync="selectedItem"></category-tree-item>
  </ul>
</template>

<script type="text/babel">
  import {categoryTree} from '../../vuex/modules/product/category/getter.js';
  import {getCategoryTree} from '../../vuex/modules/product/category/action.js';
  import categoryTreeItem from './category-tree-item.vue';

  export default {
    props: {
      type: {
        type: Number,
        default: 0
      },
      selectedItem: {
        type: Object,
        default: () => {
            return {
              id: '',
              title:''
            }
          }
      },
    },
    data: () => {
      return {
        categoryTree: {
          id: '',
          title: '',
          children: []
        }
      }
    },
    vuex: {
      getters: {
        _categoryTree: categoryTree
      },
      actions: {
        getCategoryTree: getCategoryTree
      }
    },
    components: {
      categoryTreeItem
    },
    created(id){
      if(this.type){
        this.getCategoryTree(this.type);
      }
    },
    watch: {
      _categoryTree: function () {
        this.categoryTree = _.cloneDeep(this._categoryTree);
      }
    }
  }
</script>
<style>
.category-tree li {
    list-style: none;
}
</style>