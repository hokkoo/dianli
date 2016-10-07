<template>
  <div class="home">
    <div class="center">
      厦门嘉利乐工贸有限公司
    </div>
    <group>
      <div class="news">
        <swiper :list="news" :index="demo01_index"></swiper>
      </div>
      <card>
        <div slot="content" class="card-demo-flex card-demo-content01">
          <div class="vux-1px-l vux-1px-r">
            <span>15</span>
            <br/>
            <a v-link="{path:'/mobile/product/doors'}">
              门
            </a>
          </div>
          <div class="vux-1px-r">
            <span>15</span>
            <br/>
            <a v-link="{path:'/mobile/product/wares'}">
              洁具
            </a>
          </div>
        </div>
      </card>

    </group>
    <group>
      <div class="doors">
        <card v-for="item in hots.doors" v-link="{name: 'productDoorDetail', params: {id: item.id}}">
          <img slot="header" v-bind:src="item.image && item.image.url" v-if="item.image"/>
          <div slot="content" class="card-padding">
            <p style="color:#999;font-size:12px;">{{item.createdAt}}</p>
            <p style="font-size:14px;line-height:1.2;">{{item.title}}</p>
          </div>
        </card>
      </div>
    </group>
  </div>
</template>

<script>
import { Cell, Group, Badge, Swiper, GroupTitle, SwiperItem, XButton, Divider, Card, XImg } from './components/vux'

import {getHomeHots} from './vuex/modules/hot/home/action.js';
import {hots} from './vuex/modules/hot/home/getter.js';

const baseList =
[{
  url: 'javascript:',
  img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/1.jpg',
  title: '如何手制一份秋意的茶？'
}, {
  url: 'javascript:',
  img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/2.jpg',
  title: '茶包VS原叶茶'
}, {
  url: 'javascript:',
  img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/3.jpg',
  title: '播下茶籽，明春可发芽？'
}]


export default {
  components: {
    Cell,
    Group,
    Badge,
    Swiper,
    GroupTitle,
    SwiperItem,
    XButton,
    Divider,
    Card,
    XImg
  },
  vuex: {
    getters: {
      hots: hots
    },
    actions: {
      getHomeHots: getHomeHots
    }
  },
  data () {
    return {
      news: baseList
    }
  },
  ready(){
    this.getHomeHots().then(() => {
    });
  }
}
</script>

<style>
.center {
  margin-top: 15px;
  text-align: center;
}
.vux-notice {
  color: #666;
  line-height: 40px;
}
.vux-title {
  vertical-align: middle;
  text-align: center;
  color: #04BE02;
  display: inline-block;
  width: 75px;
  height: 75px;
  line-height: 75px;
  border-radius: 50%;
}
body {
  font-family: Helvetica, sans-serif;
  background-color: #fbf9fe;
}
.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}

.home .doors img {
    width: 100%;
}


</style>
