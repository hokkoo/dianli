<template>
  <div class="list-wrapper product">
    <spinner v-ref:spinner size="sm" fixed="false" text="加载中..."></spinner>
    <h1>
      {{item.id ? '编辑' : '创建'}}
    </h1>
    <div class="detail">
      <p class="list-title">{{item.name}}</p>
      <form action="." method="get" accept-charset="utf-8">
        <form-group :valid.sync="valid.all">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <form-group>
              <bs-input label="名称" required :value.sync="item.name"></bs-input>
            </form-group>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <form-group>
              <bs-input label="标题" required :value.sync="item.title"></bs-input>
            </form-group>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            分类：{{item.category.title}}<br>
            <category-tree :type="1" :selected-item.sync="item.category"></category-tree>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            标签：
            <tags :values.sync="item.tags"></tags>
          </div>
          <div class="col-md-12 col-sm-12 col-xs-12">
            <image-upload></image-upload>
          </div>
          <div class="col-md-12 col-sm-12 col-xs-12">
            <form-group>
              <bs-input label="描述" type="textarea" required :value.sync="item.desc"></bs-input>
            </form-group>
          </div>
          <div class="col-md-12 col-sm-12 col-xs-12">
            <form-group>
              <bs-input label="内容" type="textarea" required :value.sync="item.content"></bs-input>
            </form-group>
          </div>
        </form-group>
        <button type="button" class="btn btn-primary" :disabled="!valid.all" @click="saveDoor">保存</button>
      </form>
    </div>
  </div>
</template>

<script type="text/babel">
  import {door} from '../../../vuex/modules/product/door/getter.js';
  import {getDoor, saveDoor} from '../../../vuex/modules/product/door/action.js';
  import {input as bsInput, formGroup, spinner, vSelect} from 'vue-strap';
  import tags from '../../common/tags.vue';
  import categoryTree from '../../common/category-tree';
  import imageUpload from '../../common/image-upload.vue';

  export default {
    data: function () {
      return {
        valid:{},
        item: {
          name: '',
          content: '',
          title: '',
          desc: '',
          tags: [],
          category: {
            id: null,
            title: null
          }
        }
      }
    },
    vuex: {
      getters: {
        _item: door
      },
      actions: {
        getItem: getDoor,
        _saveDoor: saveDoor
      }
    },
    components:{
      bsInput,
      formGroup,
      tags,
      spinner,
      categoryTree,
      imageUpload
    },
    methods: {
      saveDoor(){
        const _self = this;
        let isEdit = !!this.item.id;
        this.$refs.spinner.show();
        this.item.category_id = this.item.category && this.item.category.id || this.item.category_id || 0;
        var defer = this._saveDoor(this.item);
        defer.always( () => {
          this.$refs.spinner.hide();
        }).done( () => {
          _self.$router.go({
            name: 'productDoorDetail',
            params: {
              id: _self.item.id
            }
          });
        });
      }
    },
    created(id){
      console.log(this.$route.params)
      this.getItem(this.$route.params.id);
    },
    watch: {
      _item: function () {
        var item = this._item;
        console.log(Object.keys(item));
        var _tags = item.tags;
        _.extend(this.item, item);
        var tags = this.item.tags = [];
        _.each(_tags, (tag) => {
          tags.push(tag.id);
        });
      }
    }
  }
</script>
<style>
  
</style>
