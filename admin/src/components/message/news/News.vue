<template>
  <div class="news-detail clearfix">
    <h1>
      {{item.title}}
      <a v-link="{ name: 'newsEdit', params: {id: item.id}}">编辑</a>
    </h1>
    <div>
      <p>简述</p>
      <p>
        {{item.desc}}
      </p>
    </div>
    <div class="card">
      图片：
      <image-plate :type="imageType" :list.sync="item.images"></image-plate>
    </div>
    <hr/>
    <div>
      <h2>详情</h2>
      <p>
        {{{item.content}}}
      </p>
    </div>
  </div>
</template>

<script type="text/babel">
  import {getNews, addImage, deleteImage} from '../../../vuex/modules/message/news/action.js';
  import imagePlate from '../../common/image-plate';
  import {message as messageType} from '../../_config/type.json';
  import getObject from './newsProcessor.js';
  export default {
    data: () => {
      return {
        imageType: messageType.news,
        item: getObject()
      }
    },
    vuex: {
      actions: {
        getItem: getNews,
        addImage: addImage,
        deleteImage: deleteImage
      }
    },
    events: {
      addImage(image){
        image.related_id = this.item.id;
        this.addImage(image);
      },
      removeImage(image){
        image.related_id = this.item.id;
        this.deleteImage(image);
      }
    },
    components: {
      imagePlate
    },
    created(id){
      if(this.$route.params.id){
        this.getItem(this.$route.params.id).then( (data) => {
          var item = this.item;
          var images = data.images;
          delete data.images;
          _.extend(item, data);
          _.each(images, (image) => {
            item.images.push(image);
          });
        });
      }
    },
    ready(){
      console.log(this.$el);
    }
  }
</script>
<style type="text/css">
  .door-detail {
    padding: 0 20px;
}

.door-detail > .title {
    font-size: 18px;
    font-weight: bold;
}

.door-detail > .title a {
    font-size: 12px;
    font-weight: normal;
}

.door-detail li {
    list-style: none;
    float: left;
    margin-right: 20px;
}

.door-detail .images > .item {
    float: left;
    width: 25%;
    box-sizing: border-box;
    padding: 1%;
}

.door-detail .images img {
    max-width: 100%;
}

.door-detail .images > .item h1 {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>