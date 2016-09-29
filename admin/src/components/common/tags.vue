<template>
  <div class="tags">
    <form-group :valid.sync="valid">
      <bs-select :value.sync="values" :options="tags" multiple name="tags[]" search justified required clear-button></bs-select>
    </form-group>
  </div>
</template>

<script type="text/babel">
  import {tags} from '../../vuex/modules/product/tag/getter.js';
  import {getTags, saveTags} from '../../vuex/modules/product/tag/action.js';
  import {input as bsInput, formGroup} from 'vue-strap';
  import bsSelect from './bs-select.vue';

  export default {
    props: {
      select: {
        type: Object,
        default: () => {
            return {
              justified: true,
              clearButton: true,
              multiple: true
            }
          }
      },
      type: {
        type: Number,
        default: 0
      },
      valid: Boolean,
      tags: {
        type: Array,
        default: () => []
      },
      values: {
        type: Array,
        default: () => []
      }
    },
    vuex: {
      getters: {
        _tags: tags
      },
      actions: {
        getTags: getTags,
        saveTags: saveTags
      }
    },
    components: {
      bsSelect,
      bsInput,
      formGroup
    },
    created(id){
      console.log(this.type);
      this.getTags(this.type);
    },
    watch: {
      _tags: function () {
        console.log(this._tags);
        this.tags.length = 0;
        var news = [];
        _.each(this._tags, (tag) => {
          this.tags.push(tag);
          if(tag.new){
            news.push(tag);
          }
        });
        if(news){
          this.saveTags(news, this.type);
        }
      }
    }
  }
</script>
