<template>
  <div class="company-detail clearfix col-xs-12">
    <h1>
      {{item.name}}
      <a v-link="{ name: 'companyEdit', params: {id: item.id}}">编辑</a>
    </h1>
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
    <div class="card owner">
      <span class="item">
          <label>
            法人：
            <span>
              {{item.owner && item.owner.name}}
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
    <div class="card tags">
      <p>分类：</p>
      <ul class="clearfix">
        <li v-for="category in item.categorys || []">
          <span>{{category.title}}</span>
        </li>
      </ul>
    </div>
    <div class="card">
      图片：
      <div class="images clearfix">
        <div class="item" v-for="image in item.images">
          <h1>{{image.title || image.filename}}</h1>
          <img v-bind:src="image.url"/>
        </div>
      </div>
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
  import {company} from '../../../vuex/modules/company/company/getter.js';
  import {getCompany} from '../../../vuex/modules/company/company/action.js';
  import imagePlate from '../../common/image-plate';
  import getObject from './processor.js';

  export default {
    data: () => {
      return {
        item: getObject()
      }
    },
    vuex: {
      actions: {
        getItem: getCompany
      }
    },
    components: {
      imagePlate
    },
    created(id){
      this.getItem(this.$route.params.id).then( (data) => {
        var item = this.item;
        var images = data.images, tags = data.tags, categorys = data.categorys, owner = data.owner;
        delete data.images;
        delete data.tags;
        delete data.categorys;
        delete data.owner;
        _.extend(item, data);
        _.extend(item.owner, owner);
        _.each(images, (image) => {
          item.images.push(image);
        });
        _.each(tags, (tag) => {
          item.tags.push(tag);
        });
         _.each(categorys, (category) => {
          item.categorys.push(category);
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