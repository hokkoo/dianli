<!-- 基于select2的封装 -->
<template>
  <div class="select-tags">
    <div class="selecteds">
      <ul>
        <li v-for="option in selecteds | filterBy searchValue" :id="option.value||option" class="item">
          <span v-html="option.label||option"></span>
          <span class="close" @click="clearSearch">&times;</span>
        </li>
      </ul>
    </div>
    <div class="bs-select">
      <v-select :value.sync="select.value" :options="select.options" multiple name="animals[]" limit="3" search justified required disabled clear-button close-on-select></v-select>
    </div>
  </div>
</template>

<script type="text/babel">
  import {door} from '../../../vuex/modules/product/door/getter.js';
  import {getDoor} from '../../../vuex/modules/product/door/action.js';
  import {input as bsInput, formGroup, vSelect} from 'vue-strap';

  export default {
    props: {
      values: {
        type: Array,
        default: []
      },
      type: Number,
      placeholder: String，
      valid: {
        type: Object,
        default: {}
      },
      select: {
        type: Object,
        default: {
          options: [
          ],
          justified: true,
          search: true
        }
      }
    },
    data: function () {
      return {
        selectedsMap: {} //值对照表，可以由value查找对应的option
      }
    },
    watch: {
      'select.options': function (newVal, oldVal) {
        
      },
      'values': function (newVal, oldVal) {
        
      }
    }
    methods: {
      deleteSelected(item){

      },
      syncSelectedAndOptions(reverse){
        var values = this.values, options = this.select.options;
        // reverse: true: 从 options > values; false: 从 values > options;
        // TODO 暂时不考虑
        if(reverse){

        }else{

        }
      },
      // 目前一次性全部加载，不做分页
      loadData(data){
        this.select.options.length = 0;
        if(_.isArray(data)){
          var _self = this;
          _.each(data, (value) => {
            this.select.options.push(value);
          });
        }else{
          this.select.options.push(data);
        },

      }
    },
    vuex: {
      getters: {
        item: door
      },
      actions: {
        getItem: getDoor
      }
    },
    components: {
      vSelect,
      bsInput,
      formGroup
    },
    created(id){
      this.getItem(this.$route.params.id);
    },
    ready(){
      var _self = this;
      $(this.$el).find('select').select2({
        tags: true,
        tokenSeparators: [',', ' '],
        placeholder: this.placeholder || '请选取'
      })
    }
  }
</script>
