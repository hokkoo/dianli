<template>
  <div class="gallery-detail">
    <div class="detail">
      <div class="normal-state" v-show="!item.edit">
        <h3 class="title">
          {{item.title}}
          <span class="count" v-if="item.images">{{item.images.length}}</span>
        </h3>
        <div class="desc">
          {{item.desc}}
        </div>
        <div class="content">
          {{{item.content}}}
        </div>
      </div>
      <div class="edit-state" v-show="item.edit">
        <form action="">
          <form-group :valid.sync="valid">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <form-group>
                <bs-input label="名称" :value.sync="newItem.title"></bs-input>
              </form-group>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">
              <form-group>
                <bs-input label="描述" type="textarea" required :value.sync="newItem.desc"></bs-input>
              </form-group>
            </div>
            <div class="col-md-12 col-sm-12 col-xs-12">
              <form-group>
                <v-ueditor :type="type" :content.sync="newItem.content" v-ref:content></v-ueditor>
              </form-group>
            </div>
          </form-group>
        </form>
      </div>
      <div class="opr">
        <button type="button" class="btn btn-primary" v-show="!item.edit" @click="item.edit=true">编辑</button>
        <button type="button" class="btn btn-warn" v-show="!item.edit" @click="deleteItem(item)">删除</button>
        <button type="button" class="btn btn-primary" v-show="item.edit" @click="item.edit=false">取消</button>
        <button type="button" class="btn btn-warn" v-show="item.edit" @click="saveItem(newItem)">保存</button>
      </div>
    </div>
    <div class="images">
      <image-plate :type="31" :list.sync="images"></image-plate>
    </div>
  </div>
  <modal v-ref:modal cancel-text="取消" ok-text="确定" :callback="confirmDeleteItem" :show.sync="modalIsShowed">
    <div slot="modal-body" class="modal-body">
      <alert type="danger">
        请确认是否删除图库？
      </alert>
    </div>
  </modal>
</template>

<script type="text/babel">
  import {getGallery, saveGallery, deleteGalary, addImage, deleteImage} from '../../../vuex/modules/product/gallery/action.js';
  import {input as bsInput, formGroup, spinner, vSelect, modal, alert} from 'vue-strap';
  import imagePlate from '../../common/image-plate.vue';
  import vUeditor from '../../common/v-ueditor.vue';

  export default {
    data: () => {
      return {
        modalIsShowed: false,
        valid: false,
        images: [],
        item: {
          edit: false,
          id: 0,
          title: '',
          desc: '',
          content: ''
        },
        newItem: {
          id: 0,
          title: '',
          desc: '',
          content: ''
        }
      }
    },
    vuex: {
      actions: {
        getGallery: getGallery,
        saveGallery: saveGallery,
        deleteGalary: deleteGalary,
        deleteImage: deleteImage,
        addImage, addImage
      }
    },
    components: {
      bsInput,
      modal,
      imagePlate,
      formGroup,
      vUeditor,
      alert
    },
    methods: {
      saveItem(newItem){
        this.saveGallery(newItem).then( (data) => {
          if(data){
            _.extend(this.item, newItem);
          }
        });
      },
      confirmDeleteItem(){
        this.deleteGalary(this.item).then( (data) => {
          if(data){
            this.modalIsShowed = false;
            this.$router.go('/admin/product/gallerys');
          }
        });
      },
      deleteItem(item){
        this.modalIsShowed = true;
      }
    },
    events: {
      removeImage(image){
        this.deleteImage(image);
      },
      addImage(image){
        console.log(this);
        image.related_id = this.item.id;
        this.addImage(image).then( (item) => {
          image.id = item.id;
        });
      }
    },
    created(){
      this.getGallery(this.$route.params.id).then( (data) => {
        console.log(data);
        if(data){
          var images = data.images;
          delete data.images;
          _.extend(this.item, data);
          _.extend(this.newItem, data);
          _.each(images, (image) => {
            this.images.push(image);
          })
        }
      });
    }
  }
</script>

<style>
.gallerys{

}
</style>
