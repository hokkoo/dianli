<template>
  <div class="product-index">
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
  </div>
</template>
<script>
  import { Cell, Group, Badge, Swiper, GroupTitle, SwiperItem, XButton, Divider, Card } from '../vux'
  export default {
    name: 'Product',
    components:{
      Card
    }
  }
</script>

<style>
</style>
