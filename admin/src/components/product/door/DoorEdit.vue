<template>
  <div class="door-edit clearfix">
    <spinner v-ref:spinner size="sm" fixed="false" text="加载中..."></spinner>
    <div class="col-xs-12">
      <h1>
        {{item.id ? '编辑' : '创建'}}
        <button type="button" class="btn btn-primary" :disabled="!valid.all" @click="saveDoor">保存</button>
      </h1>
    </div>
    <div class="price-wrap">
      <price :item.sync="item.price" :units="doorPriceUnit"></price>
    </div>
    <div class="detail clearfix">
      <div class="col-xs-12">
        <p class="list-title">{{item.name}}</p>
      </div>
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
            分类：{{selectedItems}}
            <br>
            <door-category :type="1" :enable-edit="false" :selected-item-map.sync="selectedItemMap"></door-category>
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
      </form>
    </div>
  </div>
</template>

<script type="text/babel">
  import {getDoor, saveDoor} from '../../../vuex/modules/product/door/action.js';
  import {input as bsInput, formGroup, spinner, vSelect} from 'vue-strap';
  import tags from '../../common/tags.vue';
  import categoryTree from '../../common/category-tree';
  import imagePlate from '../../common/image-plate.vue';
  import vUeditor from '../../common/v-ueditor.vue';
  import doorCategory from './DoorCategory.vue';
  import {door as doorUnitData} from './unitData.json';
  import price from '../../common/price/price.vue';
  import getObject from './doorProcessor.js';
  import {extend} from '../../../utils/utils.js';

  export default {
    data: function () {
      return {
        doorPriceUnit: doorUnitData,
        valid:{},
        item: getObject(),
        selectedItemMap: {
          materior: {},
          style: {},
          usage: {},
          classification: {}
        }
      }
    },
    vuex: {
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
      vUeditor,
      doorCategory,
      price
    },
    methods: {
      saveDoor(){
        let item = getObject();
        extend(item, this.item);
        item.images.length = item.tags.length = item.categorys.length = 0;
        _.each(this.item.images, (image) => {
          item.images.push(image.id);
        });
        _.each(this.item.tags, (tag) => {
          item.tags.push(tag.id);
        });
        _.each(this.selectedItemMap, (value, key) => {
          if(value && value.id){
            item.categorys.push(value.id);
          }
        });
        item.price_id = parseInt(item.price_id, 10) || null;
        if(item.price && !item.price_id){
          item.price_id = item.price.id;
        }

        this.$refs.spinner.show();
        const _self = this;
        this._saveDoor(item).always( () => {
          this.$refs.spinner.hide();
        }).done( (data) => {
          if(data){
              this.item.id = data.id;
              _self.$router.go({
                name: 'productDoorDetail',
                params: {
                  id: _self.item.id
                }
              });
          }
        });
      }
    },
    computed: {
      selectedItems(){
        let names = [];
        var selectedItemMap = this.selectedItemMap
        if(selectedItemMap.materior.id){
          names.push(selectedItemMap.materior.title);
        }
        if(selectedItemMap.style.id){
          names.push(selectedItemMap.style.title);
        }
        if(selectedItemMap.usage.id){
          names.push(selectedItemMap.usage.title);
        }
        if(selectedItemMap.classification.id){
          names.push(selectedItemMap.classification.title);
        }
        return names.join('，');
      }
    },
    created(id){
      this.getItem(this.$route.params.id).then( (data) => {
        if(!data) return;
        extend(this.item, data);
        var names = [];
        _.each(data.categorys, (category) => {
          switch(category.sub_type){
            case 1:
              _.extend(this.selectedItemMap.materior, category);
              break;
            case 2:
              _.extend(this.selectedItemMap.style, category);
              break;
            case 3:
              _.extend(this.selectedItemMap.usage, category);
              break;
            case 4:
              _.extend(this.selectedItemMap.classification, category);
              break;
          }
        });
        this.$refs.content.setContent(this.item.content);
      })
    }
  }
</script>
<style>
  
</style>
