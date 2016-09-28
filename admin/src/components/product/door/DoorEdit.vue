<template>
  <div class="list-wrapper product">
    <spinner v-ref:spinner size="sm" fixed="false" text="加载中..."></spinner>
    <h1>
      {{item.id ? '编辑' : '创建'}}
    </h1>
    <div class="detail">
      <p class="list-title">{{item.name}}</p>
      <form action="." method="get" accept-charset="utf-8">
        <form-group :valid.sync="valid.all">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <form-group>
              <bs-input label="名称" required :value.sync="item.name"></bs-input>
            </form-group>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <form-group>
              <bs-input label="标题" required :value.sync="item.title"></bs-input>
            </form-group>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            分类：
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            标签：
          </div>
          <div class="col-md-12 col-sm-12 col-xs-12">
            <form-group>
              <bs-input label="描述" type="textarea" required :value.sync="item.desc"></bs-input>
            </form-group>
          </div>
          <div class="col-md-12 col-sm-12 col-xs-12">
            <form-group>
              <bs-input label="内容" type="textarea" required :value.sync="item.content"></bs-input>
            </form-group>
          </div>
        </form-group>
        <button type="button" class="btn btn-primary" :disabled="!valid.all" @click="saveDoor">保存</button>
      </form>
    </div>
  </div>
</template>

<script type="text/babel">
  import {door} from '../../../vuex/modules/product/door/getter.js';
  import {getDoor, saveDoor} from '../../../vuex/modules/product/door/action.js';
  import {input as bsInput, formGroup, spinner} from 'vue-strap';

  export default {
    data: function () {
      return {
        valid:{},
        item: {
          name: '',
          content: '',
          title: '',
          desc: ''
        }
      }
    },
    vuex: {
      getters: {
        _item: door
      },
      actions: {
        getItem: getDoor,
        _saveDoor: saveDoor
      }
    },
    components:{
      bsInput,
      formGroup,
      spinner
    },
    methods: {
      saveDoor(){
        const _self = this;
        let isEdit = !!this.item.id;
        this.$refs.spinner.show();
        var defer = this._saveDoor(this.item);
        defer.always( () => {
          this.$refs.spinner.hide();
        }).done( () => {
          _self.$router.go({
            name: 'productDoorDetail',
            params: {
              id: _self.item.id
            }
          });
        });
      }
    },
    created(id){
      console.log(this.$route.params)
      this.getItem(this.$route.params.id);
    },
    watch: {
      _item: function () {
        var item = this._item;
        console.log(Object.keys(item));
        _.extend(this.item, item);
      }
    }
  }
</script>
<style>
  
</style>
