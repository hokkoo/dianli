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
            图片：
            <image-plate :type="1" :list.sync="item.images"></image-plate>
          </div>
          <div class="col-md-12 col-sm-12 col-xs-12">
            <form-group>
              <bs-input label="描述" type="textarea" required :value.sync="item.desc"></bs-input>
            </form-group>
          </div>
          <div class="col-md-12 col-sm-12 col-xs-12">
            <form-group>
              <v-ueditor :type="1" :content.sync="item.content" v-ref:content></v-ueditor>
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
  import imagePlate from '../../common/image-plate.vue';
  import vUeditor from '../../common/v-ueditor.vue';

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
          },
          images: []
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
      imagePlate,
      vUeditor
    },
    methods: {
      saveDoor(){
        const _self = this;
        let isEdit = !!this.item.id;
        this.$refs.spinner.show();
        var item = _.cloneDeep(this.item);
        item.category_id = item.category && item.category.id || item.category_id || 0;
        console.log(item);
        var defer = this._saveDoor(item);
        defer.always( () => {
          this.item.id = item.id;
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
      this.getItem(this.$route.params.id).then( () => {
        console.log(2)
        var item = this._item;
        var _tags = item.tags;
        _.extend(this.item, item);
        var tags = this.item.tags = [];
        _.each(_tags, (tag) => {
          tags.push(tag.id);
        });
        var _images = item.images;
        var images = this.item.images = [];
        _.each(_images, (image) => {
          images.push(image);
        });
        this.$refs.content.setContent(item.content);
      })
    },
    watch: {
      _item: function () {
        return;
        var item = this._item;
        console.log(Object.keys(item));
        var _tags = item.tags;
        _.extend(this.item, item);
        var tags = this.item.tags = [];
        _.each(_tags, (tag) => {
          tags.push(tag.id);
        });
        var _images = item.images;
        var images = this.item.images = [];
        _.each(_images, (image) => {
          images.push(image);
        });

      }
    }
  }
</script>
<style>
  
</style>
