<template>
  <div class="price-rules">
    {{_ruleTexts}}
    <div class="rule" v-for="item in ruleTexts">
      <div class="normal-state" v-show="!item.edit">
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
        <button type="button" class="btn btn-primary" :disabled="!item.valid" @click="saveItem(item.origin)">保存</button>
        <button type="button" class="btn btn-warn" @click="item.edit=false">取消</button>
        <form-group :valid.sync="item.valid">
          <bs-input label="数量" required :value.sync="item.origin.size"></bs-input>
          <bs-input label="价格" required :value.sync="item.origin.price"></bs-input>
          <bs-input label="百分比" :value.sync="item.origin.percent"></bs-input>
        </form-group>
      </div>
      <div class="opr">
        <button type="button" class="btn btn-primary" v-show="!item.edit" @click="item.edit=true">编辑</button>
        <button type="button" class="btn btn-warn" v-show="!item.edit" @click="deleteItem(item.origin)">删除</button>
      </div>
    </div>
    <div class="add-form">
      <button type="button" class="btn btn-primary" :disabled="!newItem.valid" @click="createItem(newItem)">保存</button>
      <form-group :valid.sync="newItem.valid">
        <bs-input label="数量" required :value.sync="newItem.size"></bs-input>
        <bs-input label="价格" required :value.sync="newItem.price"></bs-input>
        <bs-input label="百分比" :value.sync="newItem.percent"></bs-input>
      </form-group>
    </div>
  </div>
</template>

<script type="text/babel">
  import {input as bsInput, formGroup, spinner, vSelect} from 'vue-strap';
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
      },
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
        },
        ruleTexts: []
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
      _ruleTexts(){
        console.log('xd')
        var rules = this.price.rules;
        this.fixRuleTexts();
        return '';
      }
    },
    components: {
      bsInput,
      formGroup
    },
    methods: {
      fixRuleTexts(){
        console.log('xx');
        var rules = _.sortBy(this.price.rules, (rule) => {
          return rule.size
        });
        var arr = this.ruleTexts, length = rules.length, text = '';
        arr.length = 0;
        _.each(rules, (rule, idx) => {
          rule;
          if(idx === length -1){
            text = '> ' + rule.size
            rule = {
              edit: false,
              text: text,
              value: rule.price,
              origin: rule
            };
          }else{
            text = rule.size + ' ~ ' + rules[idx+1].size,
            rule = {
              edit: false,
              text: text,
              value: rule.price,
              origin: rule
            };
          }
          arr.push(rule);
        });
        return arr;
      },
      // 删除
      saveItem(item){
        this.savePriceRule(item).then( () => {
          item.edit = false;
        });
      },
      createItem(item){
        console.log(item);
        var _self = this;
        item.related_id = this.price.id;
        this.createPriceRule(item).then( (data) => {
          _self.price.rules.push(data);
          _self.newItem.size = 0;
          _self.newItem.price = 0;
          _self.newItem.percent = 0;
          _self.newItem.valid = false;
        })
      },
      deleteItem(item){
        this.deletePriceRule(item).then( () => {
          let idx = this.price.rules.indexOf(item);
          this.price.rules.splice(idx, 1);
        });
      }
    },
    ready(){
      console.log('pr');
      console.log(this._ruleTexts);
    }
  }
</script>
<style type="text/css">

</style>