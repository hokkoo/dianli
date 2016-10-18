<template>
  <div class="about">
    <card>
      <img slot="header" src="http://placeholder.qiniudn.com/640x300" style="width:100%;display:block;">
      <div slot="content" class="card-padding">
        <div class="title">
          厦门嘉利乐工贸有限公司
        </div>
        <div class="desc">
          专注门业十年，有防火门、防盗门、木门、卫生间门
        </div>
      </div>
    </card>
    <tab :line-width=2 active-color='#fc378c' :index.sync="index">
      <tab-item class="vux-center">详情</tab-item>
      <tab-item class="vux-center">图片</tab-item>
    </tab>
    <div class="detail" v-show="index === 0">
      大大发打发打发打发打发大
    </div>
    <div class="images" v-show="index === 1">
      <list :lazy="true" url="/company/about/images" :param.sync="param" :items.sync="images" height="400px" v-ref:gallerys>
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
  import {spinner, alert} from 'vue-strap';
  import {Tab,TabItem} from '../../vux/tab';
  import Card from '../../vux/card';
  import Dialog from '../../vux/dialog';
  import List from '../../common/pager/list.vue';
  import {getAbno} from '../../../vuex/modules/product/gallery/action.js';

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
        item: {
          id: 0,
          title: '',
          desc: '',
          content: ''
        },
        param: {
          keyword: '',
          galeryId: 0
        }
      }
    },
    vuex: {
      actions: {
        getGalleryNotImage: getGalleryNotImage
      }
    },
    components: {
      spinner,
      alert,
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
      this.getGalleryNotImage(this.$route.params.id).then( (data) => {
        _.extend(this.item, data);
        this.param.galeryId = data.id;
        this.$refs.gallerys.refresh();
      });
    }
  }
</script>

<style>
.gallerys{

}

.gallery-detail > .head,.gallery-detail > .detail {
    padding:  10px;
}
.gallery-detail .weui_dialog_alert img, .gallery-detail .weui_dialog_alert .img-box {
    max-width: 100%;
}

.gallery-detail .weui_dialog_alert .dialog-title {
    padding: 4px 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
