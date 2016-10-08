<template>
  <div class="contact-edit col-xs-12">
    <spinner v-ref:spinner size="sm" fixed="false" text="加载中..."></spinner>
    <h3 class="title">
      {{contact.name}}
      <button type="button" class="btn btn-primary" :disabled="!valid.all" @click="save">保存</button>
      <button type="button" class="btn btn-warn" @click="cancel">取消</button>
    </h3>
    <div class="detail row">
      <form action="">
        <form-group :valid.sync="valid.all">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <form-group>
              <bs-input label="名称" :value.sync="contact.name"></bs-input>
            </form-group>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <form-group>
              <bs-input label="真实姓名" :value.sync="contact.realName"></bs-input>
            </form-group>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <form-group>
              <bs-input label="身份证：" :value.sync="contact.IDCard"></bs-input>
            </form-group>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <form-group>
              <bs-input label="公司：" :value.sync="contact.companyName"></bs-input>
            </form-group>
          </div>
          <div class="col-md-12 col-sm-12 col-xs-12">
            图片：
            <image-plate :type="type" :list.sync="contact.images"></image-plate>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <form-group>
              <bs-input label="部门：" :value.sync="contact.department"></bs-input>
            </form-group>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <form-group>
              <bs-input label="邮箱：" :value.sync="contact.email"></bs-input>
            </form-group>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <form-group>
              <bs-input label="地址：" :value.sync="contact.address"></bs-input>
            </form-group>
          </div>
          <div class="col-md-12 col-sm-12 col-xs-12">
            <form-group>
              <bs-input label="描述" type="textarea" required :value.sync="contact.desc"></bs-input>
            </form-group>
          </div>
          <div class="col-md-12 col-sm-12 col-xs-12">
            <form-group>
              <v-ueditor :type="type" :content.sync="contact.content" v-ref:content></v-ueditor>
            </form-group>
          </div>
        </form-group>
      </form>
    </div>
  </div>
</template>

<script type="text/babel">
  import {saveContact} from '../../../vuex/modules/product/contact/action.js';
  import { contact as contactType } from '../../_config/type.json';
  import {input as bsInput, formGroup, spinner, vSelect} from 'vue-strap';
  import imagePlate from '../../common/image-plate.vue';
  import vUeditor from '../../common/v-ueditor.vue';
  import getContactObject from './processor.js';

  export default {
    props: {
      contact: {
        type: Object,
        default: getContactObject
      }
    },
    data: () => {
      return {
        valid: {
          all: false
        },
        type: contactType
      }
    },
    methods: {
      save(){
        this.saveContact(this.contact).then( (data) => {
          this.$dispatch('contactEditSuccess', data);
        });
      },
      cancel(){
        this.$dispatch('contactEditCancel');
      }
    },
    vuex: {
      actions: {
        saveContact: saveContact
      }
    },
    components: {
      bsInput,
      formGroup,
      spinner,
      vUeditor,
      imagePlate
    }
  }
</script>
