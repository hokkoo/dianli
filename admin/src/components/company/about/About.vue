<template>
  <div class="about-us clearfix col-xs-12">
    <h1>
      {{item.name}}
      <a v-link="{ name: 'aboutUsEdit', params: {id: item.id}}">编辑</a>
    </h1>
    <div class="card">
      <p>标题</p>
      <p>
        {{item.title}}
      </p>
    </div>
    <div class="card">
      <p>全称</p>
      <p>
        {{item.fullname}}
      </p>
    </div>
    <div class="card">
      <p>简述</p>
      <p>
        {{item.desc}}
      </p>
    </div>
    <div class="card contacts">
      联系人：
      <span class="item" v-for="contact in item.contacts">
          <label>
            <span>
              {{contact.name}}
            </span>
          </label>
        </span>
    </div>
    <div class="card contact">
      <span class="item">
          <label>
            电话：
            <span>
              {{item.phone}}
            </span>
          </label>
        </span>
        <span class="item">
          <label>
            手机号码：
            <span>
              {{item.mobile}}
            </span>
          </label>
        </span>
    </div>
    <div class="card address">
      <span class="item">
          <label>
            地址：
            <span>
              {{item.address}}
            </span>
          </label>
        </span>
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
  import {getAboutUsData} from '../../../vuex/modules/company/about/action.js';
  import imagePlate from '../../common/image-plate';
  import getObject from './aboutProcessor.js';

  export default {
    data: () => {
      return {
        item: getObject()
      }
    },
    vuex: {
      actions: {
        getItem: getAboutUsData
      }
    },
    components: {
      imagePlate
    },
    created(id){
      this.getItem().then( (data) => {
        var item = this.item;
        var images = data.images, contacts = data.contacts;
        delete data.images;
        delete data.contacts;
        _.extend(item, data);
        _.each(images, (image) => {
          item.images.push(image);
        });
        _.each(contacts, (contact) => {
          item.contacts.push(contact);
        });
      });
    },
    ready(){
      console.log(this.$el);
    }
  }
</script>
<style type="text/css">
.company-detail{

}

.company-detail .images .item {
    width: 25%;
    float: left;
    padding: 10px;
}

.company-detail .images .item img {
    max-width: 100%;
}
</style>