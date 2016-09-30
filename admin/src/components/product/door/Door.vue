<template>
  <div class="list-wrapper product">
    <h1>
      {{item.name}}
      <a v-link="{ name: 'productDoorEdit', params: {id: item.id}}">编辑</a>
    </h1>
    <div>
      <p>简述</p>
      <p>
        {{item.desc}}
      </p>
    </div>
    <div>
      <p>内容</p>
      <p>
        {{item.content}}
      </p>
    </div>
    <div class="tags">
      <p>标签：</p>
      <ul>
        <li v-for="tag in tags || []" :id="option.value||option">
          <span>{{tag.name}}</span>
        </li>
      </ul>
    </div>
    <div class="images">
      图片：
      <image-upload></image-upload>
    </div>
  </div>
</template>

<script type="text/babel">
  import {door} from '../../../vuex/modules/product/door/getter.js';
  import {getDoor} from '../../../vuex/modules/product/door/action.js';
 // import imageUpload from '../../common/image-upload';

  export default {
    vuex: {
      getters: {
        item: door
      },
      actions: {
        getItem: getDoor
      }
    },
    components: {
      //imageUpload
    },
    created(id){
      this.getItem(this.$route.params.id);
    },
    ready(){
      console.log(this.$el);
    }
  }
</script>
