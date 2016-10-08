<template>
  <li class="category-sub-tree-item">
    <div :class="{'is-fold': isFolder}">
      <div class="normal-state" v-show="!item.edit">
        <span>{{item.title}}</span>
      </div>
      <div class="edit-state" v-show="item.edit">
        <form-group :valid.sync="item.valid">
          <bs-input label="标签名称" required :value.sync="item.newTitle"></bs-input>
          <button type="button" class="btn btn-primary" :disabled="!item.valid" @click="saveItem(item)">保存</button>
          <button type="button" class="btn btn-warn" @click="cancel(item)">取消</button>
        </form-group>
      </div>
      <div class="opr pull-right">
        <span v-if="enableEdit" v-show="!item.edit" @click="item.edit = true">编辑</span>
        <span v-if="enableEdit" v-show="!item.edit" @click="deleteItem(item)">删除</span>
        <span v-if="enableEdit" v-show="!item.edit" @click="addItem(item)">添加</span>
        <span v-if="isFolder" @click="toggle">[{{open ? '收起' : '展开'}}]</span>
      </div>
    </div>
    <ul v-show="open" v-if="isFolder">
      <category-sub-tree-item v-for="child in item.children" :item="child" :type="type" :enable-edit="enableEdit"></category-sub-tree-item>
      <li v-if="enableEdit">
        <form-group :valid.sync="newItem.valid">
          <div class="row">
            <div class="col-sm-8">
              <bs-input :value.sync="newItem.value"></bs-input>
            </div>
            <div class="col-4">
              <button type="button" class="btn btn-primary" :disabled="!newItem.valid" @click="createItem(newItem)">添加</button>
            </div>
          </div>
        </form-group>
        <form-group :valid.sync="newItems.valid">
          <div class="row">
            <div class="col-sm-8">
              <bs-input :value.sync="newItems.value"></bs-input>
            </div>
            <div class="col-4">
              <button type="button" class="btn btn-primary" :disabled="!newItems.valid" @click="createItems(newItems)">批量导入</button>
            </div>
          </div>
        </form-group>
      </li>
    </ul>
  </li>
  <modal v-ref:modal cancel-text="取消" ok-text="确定" :callback="confirmDeleteItem" :show.sync="modalIsShowed">
    <div slot="modal-body" class="modal-body">
      此类别下有子类别，删除将一并删除，请确认？
    </div>
  </modal>
</template>

<script type="text/babel">
  import {saveCategory, saveCategorys, deleteCategory} from '../../vuex/modules/product/category/action.js';
  import {input as bsInput, formGroup, modal} from 'vue-strap';
  import categorySubTreeItem from './category-sub-tree-item.vue';
  import uuid from 'uuid';

  export default {
    name: 'category-sub-tree-item',
    props: {
      enableEdit: {
        type: Boolean,
        default: true
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
        modalIsShowed: false,
        valid: false,
        open: false,
        newItem: {
          value: '',
          valid: false
        },
        newItems: {
          value: '',
          valid: false
        }
      }
    },
    methods: {
      confirmDeleteItem(item){
        this.deleteCategory(item).then( (successed) => {
          if(successed){
            console.log(item);
          }
          this.modalIsShowed = false;
        });
      },
      deleteItem(item){
        if(item.children && item.children.length){
          this.modalIsShowed = true;
        }else{
          this.confirmDeleteItem(item);
        }
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
      addItem(item){
        if(!item.children){
          Vue.set(item, 'children', []);
        }
        item.open = true;
      },
      createItems(item){
        var items = [], parent_id = this.item.id, sub_type = this.item.sub_type, type = this.type;
        var titles = item.title.split(/,/g);
        _.each(titles, (title) =>{
          items.push({
            title: title,
            parent_id: id,
            sub_type: sub_type,
            type: type,
          })
        });
        if(items.length){
          this.saveCategorys(items).then( (data) => {
            if(data){
              _.each(data, (item) => {
                this.children.push(item);
              });
            }
            item.title = '';
            item.valid = false;
          });
        }
      },
      createItem(item){
        var _item = {
          title: item.title,
          parent_id: this.item.id,
          sub_type: this.item.sub_type,
          type: this.type
        };
        this.saveCategory(item).then( (data) => {
          if(data){
            this.children.push(data);
          }
          item.title = '';
          item.valid = false;
        });
      },
      saveItem(item){
        var _item = _.extend({}, item);
        _item.title = item.newTitle;
        this.saveCategory(item).then( (successed) => {
          if(successed){
            item.title = item.newTitle;
            item.newTitle = '';
            item.edit = false;
            item.valid = false;
          }
        });
      }
    },
    vuex: {
      actions: {
        saveCategory: saveCategory
      }
    },
    components: {
      bsInput,
      formGroup,
      categorySubTreeItem,
      modal
    },
    created(){
      this.item.newTitle = '';
      this.item.valid = false;
      this.item.edit = false;
      this.item.open = false;
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