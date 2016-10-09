<template>
  <div class="price">
    <form-group :valid.sync="valid.all">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <form-group>
          <bs-input label="价格" required :value.sync="item.value"></bs-input>
        </form-group>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <form-group>
          <bs-input label="最低价格" required :value.sync="item.min"></bs-input>
        </form-group>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <form-group>
          <bs-input label="最高价格" required :value.sync="item.max"></bs-input>
        </form-group>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <form-group>
          <bs-input label="平均价格" required :value.sync="item.average"></bs-input>
        </form-group>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <form-group>
          单位：<bs-select :value.sync="item.unit" :options="units" name="unit" search justified clear-button></bs-select>
        </form-group>
      </div>
    </form-group>
    <div class="price-rules">
      
    </div>
  </div>
</template>

<script type="text/babel">
  import {modal} from 'vue-strap';

  export default {
    props: {
      unit: {
        type: Array,
        default: () => []
      },
      type: {
        type: Number,
        default: 0
      },
      item: {
        type: Object,
        default: () => {
          return {
            value: 0,
            min: 0,
            max: 0,
            average: 0,
            unit: 0,
            rules: []
          }
        }
      }
    },
    data: function () {
      return {
        unit: ['']
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