<template>
  <div class="price-rules">
    <div class="rule" v-for="item in ruleTexts">
      <div class="normal-state" v-show="!item.edit">
        <div class="opr">
          <button type="button" class="btn btn-primary" :disabled="!item.valid" @click="item.edit=true">编辑</button>
          <button type="button" class="btn btn-warn" :disabled="!item.valid" @click="saveItem(item)">取消</button>
          <button type="button" class="btn btn-warn" :disabled="!item.valid" @click="deleteItem(item)">删除</button>
        </div>
        <span class="item">
          <label>
            范围：
            <span>
              {{item.text}}
            </span>
          </label>
        </span>
        <span class="item">
          <label>
            价格：
            <span>
              {{item.value}}
            </span>
          </label>
        </span>
      </div>
      <div class="edit-state" v-show="item.edit">
        <button type="button" class="btn btn-primary" :disabled="item.valid" @click="saveItem(item.origin)">保存</button>
        <form-group :valid.sync="item.valid">
          <bs-input label="数量" required :value.sync="item.origin.size"></bs-input>
          <bs-input label="价格" required :value.sync="item.origin.price"></bs-input>
          <bs-input label="百分比" :value.sync="item.origin.percent"></bs-input>
        </form-group>
      </div>
    </div>
    <div class="add-form">
      <button type="button" class="btn btn-primary" :disabled="newItem.valid" @click="createItem">保存</button>
      <form-group :valid.sync="newItem.valid">
        <bs-input label="数量" required :value.sync="newItem.size"></bs-input>
        <bs-input label="价格" required :value.sync="newItem.price"></bs-input>
        <bs-input label="百分比" :value.sync="newItem.percent"></bs-input>
      </form-group>
    </div>
  </div>
</template>

<script type="text/babel">
  import {modal} from 'vue-strap';
  import {savePriceRule, deletePriceRule, createPriceRule} from '../../../vuex/modules/base/price/action.js';

  export default {
    props: {
      price: {
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
      rules: {
        type: Array,
        default: () => []
      }
    },
    data: function () {
      return {
        newItem: {
          size: 0,
          price: 0,
          percent: 0,
          valid: false
        }
      }
    },
    vuex: {
      actions: {
        savePriceRule: savePriceRule,
        createPriceRule: createPriceRule,
        deletePriceRule: deletePriceRule
      }
    },
    computed: {
      ruleTexts(){
        var rules = _.sort(this.price.rules, (rule) => {
          return rule.size
        });
        var arr = [], length = rules.length, text = '';
        _.each(rules, (rule, idx) => {
          if(idx === length -1){
            text = '> ' + rule.size
            arr.push({
              text: text,
              value: rule.price,
              origin: rule
            });
          }else{
            text = rule.size + ' ~ ' + rules[idx+1].size,
            arr.push({
              text: text,
              value: rule.price,
              origin: rule
            });
          }
        });
        return arr;
      }
    },
    components: {
      imageUpload,
      modal
    },
    methods: {
      // 删除
      saveItem(item){
        this.savePriceRule(item);
      },
      createItem(item){
        item.related_id = this.price.id;
        this.createPriceRule(item).then( () => {

        })
      },
      deleteItem(item){
        this.deletePriceRule(item).then( () => {
          let idx = this.price.rules.indexOf(item);
          this.price.rules.splice(idx, 1);
        });
      }
    }
  }
</script>
<style type="text/css">

</style>