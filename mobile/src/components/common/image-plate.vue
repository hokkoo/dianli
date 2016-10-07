<template>
  <div class="image-plate">
    <div class="images">
      <div class="item" v-for="image in list">
        <h1>{{image.title || image.filename}}</h1>
        <img v-bind:src="image.url"/>
        <div class="opr">
          <span @click="remove(image)">&times;</span>
        </div>
      </div>
      <div class="item extra-opr">
        <button type="button" class="btn btn-primary" @click="show">添加</button>
      </div>
    </div>
    <modal v-ref:modal cancel-text="取消" ok-text="确定" :callback="addImages" :show.sync="modalIsShowed">
      <div slot="modal-body" class="modal-body">
        <image-upload v-ref:uploader :type="type"></image-upload>
      </div>
    </modal>
  </div>
</template>

<script type="text/babel">
  // 图片操作库，显示已有图片，并能添加图片
  import imageUpload from './image-upload.vue';
  import {modal} from 'vue-strap';

  export default {
    props: {
      type: {
        type: Number,
        default: 0
      },
      list: {
        type: Array,
        default: () => {
            return []
          }
      },
    },
    data: function () {
      return {
        modalIsShowed: false
      }
    },
    components: {
      imageUpload,
      modal
    },
    methods: {
      // 删除
      remove(item){
        this.list.$remove(item)
      },
      addImages(){
        console.log(this.$refs.uploader.imageMap);
        _.each(this.$refs.uploader.imageMap, (image) => {
          image.title = image.originalname;
          image.url = '/upload/images/' + image.filename;
          image.type = this.type;
          console.log(2);
          this.list.push(image);
        });
        this.modalIsShowed = false;
        this.$refs.uploader.reset();
      },
      show(){
        this.modalIsShowed = true;
      },
      hide(){
        this.modalIsShowed = false;
      }
      
    },
    ready(){
      console.log(123)
      window.a = this;
      console.log(this);
    }
  }

  // TODO 样式如何动态引入
  // TODO 将插件做成引入方式
</script>
<style type="text/css">
  .image-plate .images > .item {
    float: left;
    width: 25%;
    overflow: hidden;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
}

.image-plate .images > .item h1 {
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}


.image-plate .item .opr {
    position: absolute;
    top: 60px;
    text-align: right;
    right: 20px;
}

.image-plate .images > .item img{
    width: 100%;
}
</style>