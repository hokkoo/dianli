<template>
  <div class="about">
    <card>
      <img slot="header" src="http://placeholder.qiniudn.com/640x300" style="width:100%;display:block;">
      <div slot="content" class="card-padding">
        <div class="title">
          {{item.title}}
        </div>
        <div class="desc">
          {{item.desc}}
        </div>
      </div>
    </card>
    <tab :line-width=2 active-color='#fc378c' :index.sync="index">
      <tab-item class="vux-center">详情</tab-item>
      <tab-item class="vux-center">图片</tab-item>
    </tab>
    <div class="detail" v-show="index === 0">
      {{{item.content}}}
    </div>
    <div class="images" v-show="index === 1">
      <list :lazy="true" url="/company/about/images" :param.sync="param" :items.sync="images" height="400px" v-ref:images>
      <slot>
        <li class="list-item" v-for="item in images">
          <card @click="showImageDialog(item)">
            <img slot="header" v-bind:src="item.url"/>
            <div slot="content" class="card-padding">
              <p>{{item.title || item.filename}}</p>
            </div>
          </card>
        </li>
      </slot>
    </list>
    </div>
    <dialog :show.sync="isShowDialog">
      <p class="dialog-title">{{dialogImage.name || dialogImage.title}}</p>
      <div class="img-box">
        <img v-bind:src="dialogImage.url"/>
      </div>
      <span class="vux-close" @click="isShowDialog=false"></span>
    </dialog>
  </div>
</template>

<script type="text/babel">
  import {Tab,TabItem} from '../../vux/tab';
  import Card from '../../vux/card';
  import Dialog from '../../vux/dialog';
  import List from '../../common/pager/list.vue';
  import {getAboutUsData} from '../../../vuex/modules/company/about/action.js';
  import getObject from '../companyProcessor.js';

  export default {
    data: () => {
      return {
        index: 0,
        images: [],
        isShowDialog: false,
        dialogImage: {
          name: '',
          title: '',
          url: '',
          desc: ''
        },
        item: getObject(),
        param: {
          keyword: '',
          galeryId: 0
        }
      }
    },
    vuex: {
      actions: {
        getAboutUsData: getAboutUsData
      }
    },
    components: {
      Card,
      Tab,
      TabItem,
      List,
      Dialog
    },
    methods: {
      showImageDialog(image){
        _.extend(this.dialogImage, image);
        this.isShowDialog = true;
      }
    },
    created(){
      this.getAboutUsData().then( (data) => {
        _.extend(this.item, data);
        this.param.companyId = data.id;
        this.$refs.images.refresh();
      });
    }
  }
</script>

<style>
</style>
