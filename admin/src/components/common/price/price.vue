<template>
  <div class="price">
    <button type="button" class="btn btn-primary" :disabled="!valid" @click="saveItem(item)">保存</button>
    <div class="detail clearfix">
      <form-group :valid.sync="valid">
        <div class="col-md-4 col-xs-12">
          <form-group>
            <bs-input label="价格" required :value.sync="item.value"></bs-input>
          </form-group>
        </div>
        <div class="col-md-4 col-xs-12">
          <form-group>
            <bs-input label="最低价格" required :value.sync="item.min"></bs-input>
          </form-group>
        </div>
        <div class="col-md-4 col-xs-12">
          <form-group>
            <bs-input label="最高价格" required :value.sync="item.max"></bs-input>
          </form-group>
        </div>
        <div class="col-md-4 col-xs-12">
          <form-group>
            <bs-input label="平均价格" required :value.sync="item.average"></bs-input>
          </form-group>
        </div>
        <div class="col-md-4 col-xs-12">
          <form-group>
            单位：<bs-select :value.sync="item.unit" :options="units" name="unit" search justified clear-button></bs-select>
          </form-group>
        </div>
      </form-group>
    </div>
    <div class="col-xs-12">
      <price-rule :price.sync="item" v-show="item.id"></price-rule>
    </div>
  </div>
</template>

<script type="text/babel">
  import {input as bsInput, formGroup, spinner, vSelect} from 'vue-strap';
  import priceRule from './price-rule.vue';
  import bsSelect from '../bs-select.vue';
  import {savePrice, createPrice} from '../../../vuex/modules/base/price/action.js';

  export default {
    props: {
      units: {
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
            id: 0,
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
        unit: [],
        modalIsShowed: false,
        valid: false
      }
    },
    components: {
      bsInput,
      formGroup,
      bsSelect,
      priceRule
    },
    vuex: {
      actions: {
        savePrice: savePrice,
        createPrice: createPrice
      }
    },
    methods: {
      saveItem(item){
        if(item.id){
          this.savePrice(item).then( (data) => {
          });
        }else{
          this.createPrice(item).then( (data) => {
            item.id = data.id;
            if(!item.rules){
              Vue.set(item, 'rules', []);
            }
          })
        }
      }
    }
  }
</script>
<style type="text/css">

</style>