<template>
  <div class="search-door">
    <div class="keyword">
      <search @on-submit="search" :required="false" :auto-fixed="false" :value.sync="keyword"></search>
      <x-button mini v-show="!hasAdvanceParam" @click="isShowAdvanceSearch=true">More</x-button>
    </div>
    <div class="param clearfix">
      <span class="item" v-for="item in selectedCategorysObject">
        {{item.title}}
      </span>
      <span class="item" v-for="item in selectedTagsObject">
        {{item.title}}
      </span>
      <div class="advance" v-show="hasAdvanceParam">
        <x-button mini @click="isShowAdvanceSearch=true">更多条件</x-button>
      </div>
    </div>
    <confirm confirm-text="确定" cancel-text="取消" :show.sync="isShowAdvanceSearch" title="高级查询" @on-cancel="onCancel" @on-confirm="onConfirm">
      <div class="search-param">
        <div class="card category">
          <door-category :selected-item="tmp.selectedCategorys" :selected-item-object="tmp.selectedCategorysObject"></door-category>
        </div>
        <div class="card tag">
          <door-tags :selected-item="tmp.selectedTags" :selected-item-object="tmp.selectedTagsObject"></door-tags>
        </div>
      </div>
    </confirm>
  </div>
</template>

<script type="text/babel">
  import {doors} from '../../../vuex/modules/product/door/getter.js';
  import { Card, Group } from '../../vux';
  import Search from '../../vux/search';
  import xButton from '../../vux/x-button';
  import confirm from '../../vux/confirm';
  import doorCategory from './DoorCategory';
  import doorTags from './DoorTags';

  export default {
    name: 'door-search',
    props: {
      type: {
        type: Number,
        default: 1
      },
      subType: {
        type: Number,
        default: 1
      },
    },
    data: () => {
      return {
        keyword: '',
        isShowAdvanceSearch: false,
        tmp: {
          selectedTags: [],
          selectedTagsObject: [],
          selectedCategorys: [],
          selectedCategorysObject: []
        },
        selectedTags: [],
        selectedTagsObject: [],
        selectedCategorys: [],
        selectedCategorysObject: []
      }
    },
    methods: {
      search(){
        this.$emit('on-search', {
          keyword: this.keyword,
          tags: this.selectedTags,
          categorys: this.selectedCategorys
        })
      },
      onConfirm(){
        var selectedTags = this.selectedTags, selectedCategorys = this.selectedCategorys;
        var selectedTagsObject = this.selectedTagsObject, selectedCategorysObject = this.selectedCategorysObject;
        selectedTags.splice(0, selectedTags.length);
        selectedCategorys.splice(0, selectedCategorys.length);
        selectedTagsObject.splice(0, selectedTagsObject.length);
        selectedCategorysObject.splice(0, selectedCategorysObject.length);
        _.each(this.tmp.selectedTags, (item) => {
          selectedTags.push(item);
        });
        _.each(this.tmp.selectedTagsObject, (item) => {
          selectedTagsObject.push(item);
        });
        _.each(this.tmp.selectedCategorys, (item) => {
          selectedCategorys.push(item);
        });
        _.each(this.tmp.selectedCategorysObject, (item) => {
          selectedCategorysObject.push(item);
        });
        this.search();
      },
      onCancel(){
        var selectedTags = this.tmp.selectedTags, selectedCategorys = this.tmp.selectedCategorys;
        selectedTags.splice(0, selectedTags.length);
        selectedCategorys.splice(0, selectedCategorys.length);
        _.each(this.selectedTags, (item) => {
          selectedTags.push(item);
        });
        _.each(this.selectedCategorys, (item) => {
          selectedCategorys.push(item);
        });
      }
    },
    computed: {
      hasAdvanceParam(){
        return this.selectedTags.length || this.selectedCategorys.length;
      }
    },
    components: {
      Card,
      Group,
      Search,
      xButton,
      confirm,
      doorTags,
      doorCategory
    }
  }
</script>

<style>
.product .doors img {
    width: 80%;
    margin: 10%;
    border: 1px solid #e1e1e1;
}

.door-search .card {
    max-height: 300px;
    overflow-x: scroll;
}

.door-category ul {
    margin: 0;
    padding: 0;
}

.search-door .weui_cell.weui_check_label {
    padding: 5px;
}

.search-door .door-category .item {
    padding: 5px 0;
}

.search-door .search-param .category {
    max-height: 300px;
    overflow-y: scroll;
}
.search-door > .param {
    padding: 2px 10px;
    font-size: 12px;
}

.search-door > .param .item {
    padding: 4px;
    color: #666;
    background-color: #eeeeee;
    margin: 2px 4px;
    float: left;
}
.search-door > .keyword {
    display: flex;
}

.search-door > .keyword > button {
    color: #666;
}

.search-door .advance button {
    color: rgba(255,255,255,0.95);
    vertical-align: middle;
    font-size: 12px;
    padding: 2px 10px;
    background-color: #09bb07;
}
</style>
