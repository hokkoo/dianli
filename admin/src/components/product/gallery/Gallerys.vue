<template>
  <div class="gallerys col-xs-12">
    <ul class="list clearfix">
      <li v-for="item in items" class="item">
        <a v-link="{ name: 'galaryDetail', params: {id: item.id}}" v-if="item.title">
          <h3 class="title">
            {{item.name}}
            <span class="count" v-if="item.images">{{item.images.length}}</span>
          </h3>
          <span class="desc">{{item.desc}}</p>
        </a>
      </li>
      <li class="add-form item">
        <form action="">
          <form-group :valid.sync="valid">
            <div class="row">
              <div class="col-md-6 col-sm-12 col-xs-12">
                <form-group>
                  <bs-input label="名称" :value.sync="newItem.title"></bs-input>
                </form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 col-sm-12 col-xs-12">
                <form-group>
                  <bs-input label="描述" type="textarea" required :value.sync="newItem.desc"></bs-input>
                </form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <form-group>
                  <bs-input label="内容" type="textarea" :value.sync="newItem.content"></bs-input>
                </form-group>
              </div>
            </div>
          </form-group>
          <div class="opr">
            <button type="button" class="btn btn-warn" :disabled="!valid"  @click="createItem(newItem)">新建</button>
          </div>
        </form>
      </li>
    </ul>
  </div>
</template>

<script type="text/babel">
  import {getGallerys, createGallery} from '../../../vuex/modules/product/gallery/action.js';
  import {input as bsInput, formGroup, spinner, vSelect, modal} from 'vue-strap';

  export default {
    data: () => {
      return {
        valid: false,
        items: [],
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
        getGallerys: getGallerys,
        createGallery: createGallery
      }
    },
    components: {
      bsInput,
      formGroup
    },
    methods: {
      createItem(item){
        this.createGallery(item).then( (data) => {
          this.items.push(data);
          this.newItem.title = '';
          this.newItem.desc = '';
          this.newItem.content = '';
        });
      }
    },
    created(){
      this.getGallerys().then( (data) => {
        _.each(data, (gallery) => {
          this.items.push(gallery);
        })
      });
    }
  }
</script>

<style>
.gallerys .item {
    float: left;
    width: 20%;
    box-sizing: border-box;
    margin: 6px 10px;
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
}
.gallerys .item.add-form {
    float: none;
    width: 100%;
    text-align: left;
}

.gallerys{
  min-height: 600px;
}
</style>
