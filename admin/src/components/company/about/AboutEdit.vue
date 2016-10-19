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
        <p class="title">{{item.name}}</p>
      </div>
      <div class="col-xs-12">
        <p class="title">{{item.title}}</p>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <form-group>
          <label for="">
            法人信息
          </label>
          <div class="card contacts">
            联系人：
            <span class="item" v-for="contact in item.contacts">
              <label>
                <span>
                  {{contact.name}}
                </span>
                <div class="opr">
                  <span @click="removeContact(image)">&times;</span>
                </div>
              </label>
            </span>
          </div>
          <contact-select :contact="item.contact"></contact-select>
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
  import {getAboutUsData, saveAboutUs} from '../../../vuex/modules/company/about/action.js';
  import {input as bsInput, formGroup, spinner, vSelect} from 'vue-strap';
  import tags from '../../common/tags.vue';
  import imagePlate from '../../common/image-plate.vue';
  import vUeditor from '../../common/v-ueditor.vue';
  import {about as aboutType} from '../../_config/type.json';
  import getObject from './aboutProcessor.js';
  import contactSelect from '../../common/contact/contact-select.vue';

  export default {
    data: function () {
      return {
        imageType: aboutType.image,
        valid: false,
        item: getObject()
      }
    },
    vuex: {
      actions: {
        getItem: getAboutUsData,
        saveItem: saveAboutUs
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
        var item = _.extend({}, this.item);
        item.owner_id = item.owner_id || 0;
        item.type = item.type || 0;
        var images = item.images;
        item.images = [];
        _.each(images, (image) => {
          item.images.push(image.id);
        });
        var contacts = item.contacts;
        item.contacts = [];
        _.each(contacts, (contact) => {
          item.contacts.push(contact.id);
        });
        this.saveItem(item).then( (data) => {
          this.$refs.spinner.hide();
          if(!this.item.id){
            this.item.id = data.id;
          }
          this.$router.go({
            name: 'aboutDetail',
            params: {
              id: this.item.id
            }
          });
        });
      }
    },
    created(id){
      this.getItem().then( (data) => {
        var item = this.item;
        var images = data.images, contacts = data.contacts;
        delete data.images;
        delete data.contacts;
        _.extend(item, data);
        _.each(images, (image) => {
          item.images.push(image);
        });
        _.each(contacts, (contact) => {
          item.contacts.push(contact);
        });
      });
    }
  }
</script>
<style>
  
</style>
