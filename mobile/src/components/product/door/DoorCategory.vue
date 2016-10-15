<template>
  <div class="door-category clearfix">
    <div class="categorys">
      <div v-for="item in categorys">
        <ul>
          <li class="item">
            <h4 class="title">
              {{item.title}}
              <span class="pull-right opr">
                <span @click="toggle(item)">[{{item.open ? '-' : '+'}}]</span>
              </span>
            </h4>
            <div class="sub" v-show="item.open">
              <checklist :options="item.children" :value="selectedItem"></checklist>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import {getCategorySubTree} from '../../../vuex/modules/product/category/action.js';
  import categoryTreeItemSelect from '../../common/category-tree-item-select.vue';
  import Checklist from '../../vux/checklist';

  export default {
    name: 'door-category',
    props: {
      enableEdit: {
        type: Boolean,
        default: false
      },
      type: {
        type: Number,
        default: 1
      },
      subType: {
        type: Number,
        default: 1
      },
      selectedItem: {
        type: Array,
        default: () => []
      },
      selectedItemObject: {
        type: Array,
        default: () => []
      }
    },
    data: () => {
      return {
        valid: false,
        open: false,
        categorys: [],
        options: [],
        treeMap: {}
      }
    },
    vuex: {
      actions: {
        getCategorySubTree: getCategorySubTree
      }
    },
    components: {
      Checklist
    },
    methods: {
      toggle(item){
        item.open = !item.open
      }
    },
    created(id){
      if(this.type){
        var categorys = this.categorys;
        this.getCategorySubTree(this.type).then( (tree) => {
          if(tree){
            _.each(tree, (value, idx) => {
              this.treeMap[value.id] = value;
              _.each(value.children, (v) => {
                this.treeMap[v.id] = v;
                v.key = v.id;
                v.value = v.title;
              });
              Vue.set(value, 'open', false);
              categorys.push(value);
            });
          }
        });
      }
    },
    watch: {
      selectedItem(newValue){
        var selectedItemObject = this.selectedItemObject;
        selectedItemObject.length = 0;
        _.each(newValue, (v) => {
          selectedItemObject.push(this.treeMap[v]);
        });
      }
    }
  }
</script>
<style type="text/css">

.door-category > .categorys {
    width: 100%;
    box-sizing: border-box;
    background-color: #e4efff;
}

</style>