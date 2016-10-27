<template>
  <div class="brand-edit clearfix">
    <spinner v-ref:spinner size="sm" fixed="false" text="加载中..."></spinner>
    <div class="col-xs-12">
      <h1>
        {{item.id ? '编辑' : '创建'}}
        <button type="button" class="btn btn-primary" :disabled="!valid" @click="save">保存</button>
      </h1>
    </div>
    <div class="detail clearfix">
      <div class="col-xs-12">
        <p class="title">{{item.title}}</p>
      </div>
      <form accept-charset="utf-8">
        <form-group :valid.sync="valid">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <form-group>
              <bs-input label="标题" required :value.sync="item.title"></bs-input>
            </form-group>
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
  import {getBrand, saveBrand} from '../../../vuex/modules/company/brand/action.js';
  import {input as bsInput, formGroup, spinner, vSelect} from 'vue-strap';
  import tags from '../../common/tags.vue';
  import imagePlate from '../../common/image-plate.vue';
  import vUeditor from '../../common/v-ueditor.vue';
  import {brand as brandType} from '../../_config/type.json';
  import getObject from './objectProcessor.js';
  import contactSelect from '../../common/contact/contact-select.vue';
  import {extend} from '../../../utils/utils.js';

  export default {
    data: function () {
      return {
        imageType: brandType.image,
        valid: false,
        item: getObject()
      }
    },
    vuex: {
      actions: {
        getItem: getBrand,
        saveItem: saveBrand
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
        var images = item.images;
        item.images = [];
        _.each(images, (image) => {
          item.images.push(image.id);
        });
        this.saveItem(item).then( (data) => {
          this.$refs.spinner.hide();
          if(!this.item.id){
            this.item.id = data.id;
          }
          this.$router.go({
            name: 'brandDetail',
            params: {
              id: this.item.id
            }
          });
        });
      }
    },
    created(id){
      if(this.$route.params.id){
        this.getItem(this.$route.params.id).then( (data) => {
          extend(this.item, data);
          this.$refs.content.setContent(this.item.content);
        });
      }
    }
  }
</script>
<style>
  
</style>
