<template>
  <div class="gallery-detail">
    <div class="head">
      <h3 class="title">
        {{item.title}}
      </h3>
      <p class="desc">
        {{item.desc}}
      </p>
    </div>
    <tab :line-width=2 active-color='#fc378c' :index.sync="index">
      <tab-item class="vux-center">详情</tab-item>
      <tab-item class="vux-center">图片</tab-item>
    </tab>
    <div class="detail" v-show="index === 0">
      {{{item.content}}}
    </div>
    <div class="images" v-show="index === 1">
      <list :lazy="true" url="/product/gallery/images" :param.sync="param" :items.sync="images" height="400px" v-ref:gallerys>
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
  import {getGalleryNotImage} from '../../../vuex/modules/product/gallery/action.js';
  import List from '../../common/pager/list.vue';

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
</style>
