<template>
  <div class="company-edit clearfix">
    <spinner v-ref:spinner size="sm" fixed="false" text="加载中..."></spinner>
    <div class="col-xs-12">
      <h1>
        {{item.id ? '编辑' : '创建'}}
        <button type="button" class="btn btn-primary" :disabled="!valid" @click="save">保存</button>
      </h1>
    </div>
    <div class="detail clearfix">
      <div class="col-xs-12">
        <p class="list-title">{{item.name}}</p>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <form-group>
          <label for="">
            法人信息
          </label>
          <contact-select :contact="item.owner"></contact-select>
        </form-group>
      </div>
      <form action="." method="get" accept-charset="utf-8">
        <form-group :valid.sync="valid">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <form-group>
              <bs-input label="名称" required :value.sync="item.name"></bs-input>
            </form-group>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <form-group>
              <bs-input label="全称" required :value.sync="item.fullname"></bs-input>
            </form-group>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <form-group>
              <bs-input label="电话：" required :value.sync="item.phone"></bs-input>
            </form-group>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <form-group>
              <bs-input label="手机号码：" required :value.sync="item.mobile"></bs-input>
            </form-group>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <form-group>
              <bs-input label="地址：" required :value.sync="item.address"></bs-input>
            </form-group>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            标签：
            <tags :values.sync="item.tags"></tags>
          </div>
          <div class="col-md-12 col-sm-12 col-xs-12">
            图片：
            <image-plate :type="imageType" :list.sync="item.images"></image-plate>
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
  import {door} from '../../../vuex/modules/product/door/getter.js';
  import {getCompany, saveCompany} from '../../../vuex/modules/company/company/action.js';
  import {input as bsInput, formGroup, spinner, vSelect} from 'vue-strap';
  import tags from '../../common/tags.vue';
  import imagePlate from '../../common/image-plate.vue';
  import vUeditor from '../../common/v-ueditor.vue';
  import {company as companyType} from '../../_config/type.json';
  import getObject from './processor.js';
  import contactSelect from '../../common/contact/contact-select.vue';

  export default {
    data: function () {
      return {
        imageType: companyType.image,
        valid: false,
        item: getObject()
      }
    },
    vuex: {
      actions: {
        getItem: getCompany,
        saveItem: saveCompany
      }
    },
    components:{
      bsInput,
      formGroup,
      tags,
      spinner,
      imagePlate,
      contactSelect,
      vUeditor
    },
    methods: {
      save(){
        this.$refs.spinner.show();
        this.saveItem(this.item).always( (data) => {
          this.$refs.spinner.hide();
        }).done( () => {
          if(!this.item.id){
            this.item.id = data.id;
          }
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
      if(this.$route.params.id){
        this.getItem(this.$route.params.id).then( (data) => {
          var item = this.item;
          var images = data.images, tags = data.tags, categorys = data.categorys, owner = data.owner;
          delete data.images;
          delete data.tags;
          delete data.categorys;
          delete data.owner;
          _.extend(item, data);
          _.extend(item.owner, owner);
          _.each(images, (image) => {
            item.images.push(image);
          });
          _.each(tags, (tag) => {
            item.tags.push(tag);
          });
           _.each(categorys, (category) => {
            item.categorys.push(category);
          });
          this.$refs.content.setContent(item.content);
        })
      }
    }
  }
</script>
<style>
  
</style>
