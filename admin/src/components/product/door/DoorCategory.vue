<template>
  <div class="door-category">
    <div class="categorys">
      <div v-for="item in categorys">
        <ul>
          <category-tree-item :enable-edit="enableEdit" :type="type" :item="item" :selected-item.sync="selectedItemMap[item.className]"></category-tree-item>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import {categorySubTree} from '../../../vuex/modules/product/category/getter.js';
  import {getCategorySubTree} from '../../../vuex/modules/product/category/action.js';
  import categoryTreeItem from '../../common/category-tree-item.vue';

  export default {
    props: {
      enableEdit: {
        type: Boolean,
        default: true
      },
      type: {
        type: Number,
        default: 1
      },
      subType: {
        type: Number,
        default: 1
      },
      selectedItemMap: {
        type: Object,
        default: () => {
          return {
            materior: {},
            style: {},
            usage: {},
            classification: {}
          }
        }
      }
    },
    data: () => {
      return {
        categorys: []
      }
    },
    vuex: {
      getters: {
        _categorySubTree: categorySubTree
      },
      actions: {
        getCategorySubTree: getCategorySubTree
      }
    },
    components: {
      categoryTreeItem
    },
    created(id){
      if(this.type){
        var categorys = this.categorys;
        this.getCategorySubTree(this.type).then( () => {
          console.log(this._categorySubTree);
          if(this._categorySubTree){
            _.each(this._categorySubTree, (value, idx) => {
              let className = '';
              switch(value.sub_type){
                case 1:
                  className = "materior";
                  break;
                case 2:
                  className = "style";
                  break;
                case 3:
                  className = "usage";
                  break;
                case 4:
                  className = "classification";
                  break;
              }
              value = _.cloneDeep(value);
              value.className = className;
              categorys.push(value);
            })
          }
        });
      }
    }
  }
</script>
<style type="text/css">
.door-category .category-tree-item {
  list-style: none;
}

.door-category .categorys > div {
  display: inline-block;
  width: 25%;
  overflow: hidden;
  vertical-align: top;
}

.door-category {
    position: relative;
    z-index: 111;
    height: 100px;
}

.door-category > .categorys {
    position: absolute;
    width: 100%;
    background-color: #e4efff;
    padding: 20px;
}

</style>