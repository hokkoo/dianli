<template>
  <div class="door-detail clearfix">
    <h1>
      {{item.name}}
      <a v-link="{ name: 'productDoorEdit', params: {id: item.id}}">编辑</a>
    </h1>
    <div>
      <p>简述</p>
      <p>
        {{item.desc}}
        <p class="price" v-if="item.price">
          价格： {{item.price.min}} ~ {{item.price.max}}
        </p>
      </p>
    </div>
    <div class="card">
      <p>分类：</p>
      <ul class="clearfix">
        <li v-for="category in item.categorys || []">
          <span>{{category.title}}</span>
        </li>
      </ul>
    </div>
    <div class="card">
      <p>标签：</p>
      <ul class="clearfix">
        <li v-for="tag in item.tags || []">
          <span>{{tag.title}}</span>
        </li>
      </ul>
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
  import {getDoor, addImage, deleteImage} from '../../../vuex/modules/product/door/action.js';
  import imagePlate from '../../common/image-plate';
  import {door as doorType} from '../../_config/type.json';
  import getObject from './doorProcessor.js';
  import {extend} from '../../../utils/utils.js';

  export default {
    data: () => {
      return {
        imageType: doorType,
        item: getObject()
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
    vuex: {
      actions: {
        getItem: getDoor,
        addImage: addImage,
        deleteImage: deleteImage
      }
    },
    components: {
      imagePlate
    },
    created(id){
      this.getItem(this.$route.params.id).then( (data) => {
        if(data){
          extend(this.item, data);
        }
      })
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