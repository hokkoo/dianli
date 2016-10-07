<template>
  <div class="door-detail">
    <div class="images">
      <swiper :list="images"></swiper>
    </div>
    <div class="head">
      <h3 class="title">
        {{item.title}}
      </h3>
    </div>
    <tab :line-width=2 active-color='#fc378c' :index.sync="index">
      <tab-item class="vux-center">详情</tab-item>
    </tab>
    <div class="detail" v-show="index === 0">
      {{{item.content}}}
    </div>
  </div>
</template>

<script type="text/babel">
  import {door} from '../../../vuex/modules/product/door/getter.js';
  import {getDoor} from '../../../vuex/modules/product/door/action.js';
  import { Card, Swiper, Tab, TabItem, SwiperItem, Group } from '../../vux'

  export default {
    vuex: {
      getters: {
        item: door
      },
      actions: {
        getItem: getDoor
      }
    },
    data: () => {
      return {
        index: 0,
        images: []
      }
    },
    components: {
      Card,
      Swiper,
      Tab,
      Group,
      TabItem,
      SwiperItem
    },
    created(id){
      this.getItem(this.$route.params.id).then(() => {
        var images = this.images;
        this.item.images && this.item.images.forEach((image) => {
          images.push({
            img: location.origin + image.url,
            url: 'javascript:',
            title: image.title || image.name
          });
        })
      });
    },
    ready(){
    }
  }
</script>
<style type="text/css">
.door-detail .detail img {
  max-width: 100%;
}

.door-detail .detail {
  padding: 20px 0;
}


.door-detail > .detail {
    width: 100%;
    overflow: hidden;
}
</style>
