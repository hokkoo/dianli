<template>
  <li class="category-tree-item">
    <div
      :class="{'is-fold': isFolder, 'selected': selectedItem.id == item.id}">
      <span class="title" @click="selectItem(item)">
          {{item.title}}
      </span>
      <span v-if="isFolder" @click="toggle">[{{open ? '-' : '+'}}]</span>
      <span v-if="enableEdit && !isFolder" @click="changeType">+</span>
    </div>
    <ul v-show="open" v-if="isFolder">
      <category-tree-item v-for="child in item.children" :item="child" :type="type" :enable-edit="enableEdit" :selected-item.sync="selectedItem"></category-tree-item>
      <li v-if="enableEdit">
        <form-group :valid.sync="valid">
          <div class="row">
            <div class="col-sm-8">
              <bs-input :value.sync="newItem.value"></bs-input>
            </div>
            <div class="col-4">
              <button type="button" class="btn btn-primary" :disabled="!valid" @click="add">添加</button>
            </div>
          </div>
        </form-group>
      </li>
    </ul>
  </li>
</template>

<script type="text/babel">
  import {saveCategory} from '../../vuex/modules/product/category/action.js';
  import {input as bsInput, formGroup} from 'vue-strap';
  import categoryTreeItem from './category-tree-item.vue';
  import uuid from 'uuid';

  export default {
    name: 'category-tree-item',
    props: {
      enableEdit: {
        type: Boolean,
        default: true
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
      item: {
        type: Object,
        default: () => {
            return {
              id: '',
              title:'',
              children: null
            }
          }
      },
      type: {
        type: Number,
        default: 0
      }
    },
    data: function () {
      return {
        valid: false,
        open: false,
        newItem: () => {
          return {
            value: ''
          };
        }
      } 
    },
    methods: {
      selectItem(item){
        this.selectedItem = item;
      },
      toggle(){
        if (this.isFolder) {
          this.open = !this.open
        }
      },
      changeType(){
        this.$set('item.children', []);
        this.open = true;
      },
      add(){
        var item = {
          parent_id: this.item.id,
          id: uuid.v1(),
          title: this.newItem.value,
          type: this.type,
          new: true
        };
        this.item.children.push(item);
        this.saveCategory(item).then( (rtn) => {
          if(rtn.successed){
            item.id = rtn.data[item.id]
            delete item.new;
          }
          // 更新一级子元素的父id
        });
        this.newItem.value = '';
      }
    },
    vuex: {
      actions: {
        saveCategory: saveCategory
      }
    },
    components: {
      bsInput,
      formGroup
    },
    computed: {
      isFolder: function () {
        return _.isArray(this.item.children);
      }
    }
  }
</script>
<style>
  .category-tree-item {
    cursor: pointer;
  }
  .bold {
    font-weight: bold;
  }
  ul {
    padding-left: 1em;
    line-height: 1.5em;
    list-style-type: dot;
  }

  .category-tree-item .is-fold {
    color: #333;
}

.category-tree-item .selected {
    color: #10c739;
}



.category-tree-item > div{
    color:#666;
}
</style>