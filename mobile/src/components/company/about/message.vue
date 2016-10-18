<template>
  <div class="message">
    <loading :show="isLoading" text="提交中"></loading>
    <toast :show.sync="isShowSuccessToast" type="text" :time="1000">提交成功</toast>
    <toast :show.sync="isShowErrorToast" type="warn" :time="1000">提交失败，请重试</toast>
    <group title="留言">
      <x-textarea :max="20" placeholder="请填写详细信息" :value.sync="item.content"></x-textarea>
    </group>
    <group title="联系信息">
      <x-input placeholder="姓名"></x-input>
      <x-input title="联系方式" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" :value.sync="item.mobile"></x-input>
      <x-input title="邮箱" name="email" placeholder="请输入邮箱地址" is-type="email" :value.sync="item.email"></x-input>
      <x-input title="QQ" type="text" placeholder="QQ" :value.sync="item.qq"></x-input>
    </group>
    <group>
      <x-button @click="submit" type="primary">提交</x-button>
      <x-button @click="goBack">取消</x-button>
    </group>
  </div>
</template>

<script type="text/babel">
  import Card from '../../vux/card';
  import Group from '../../vux/group';
  import Toast from '../../vux/toast';
  import Tip from '../../vux/tip';
  import Loading from '../../vux/loading';
  import XInput from '../../vux/x-input';
  import XButton from '../../vux/x-button';
  import XTextarea from '../../vux/x-textarea';
  import {saveMessage} from '../../../vuex/modules/message/message/action.js';
  import getObject from  '../messageProcessor.js';

  export default {
    data: () => {
      return {
        item: getObject(),
        isLoading: false,
        isShowSuccessToast: false,
        isShowErrorToast: false,
        param: {
          keyword: ''
        }
      }
    },
    vuex: {
      actions: {
        saveMessage: saveMessage
      }
    },
    methods: {
      submit(){
        this.isLoading = true;
        this.saveMessage(this.item).then( (data) => {
          this.isLoading = false;
          if(data){
            this.isShowSuccessToast = true;
            _.extend(this.item, getObject());
          }else{
            this.isShowErrorToast = true;
          }
        });
      },
      goBack(){
        history.back()
      }
    },
    components: {
      Card,
      Group,
      XInput,
      XTextarea,
      XButton,
      Toast,
      Tip,
      Loading
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

.gallerys .list-item .title {
    text-align: center;
}

</style>
