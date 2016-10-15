<template>
  <div class="door-tags">
    <tags :selected-item="selectedItem" :tags="tags"></tags>
  </div>
</template>

<script type="text/babel">
  import {getTags} from '../../../vuex/modules/product/tag/action.js';
  import tags from '../../common/search/tags';

  export default {
    name: 'door-tags',
    props: {
      type: {
        type: Number,
        default: 1
      },
      selectedItem: {
        type: Array,
        default: () => []
      },
      selectedItemObject: {
        type: Array,
        default: () => []
      }
    },
    data: () => {
      return {
        valid: false,
        tags: [],
        map: {}
      }
    },
    vuex: {
      actions: {
        getTags: getTags
      }
    },
    components: {
      tags
    },
    created(id){
      if(this.type){
        this.getTags(this.type).then( (data) => {
          const tags = this.tags, map = this.map;
          if(data){
            _.each(data, (value, idx) => {
              map[value.id] = value;
              tags.push(value);
            });
          }
        });
      }
    },
    watch: {
      selectedItem(newValue){
        var selectedItemObject = this.selectedItemObject;
        selectedItemObject.length = 0;
        _.each(newValue, (v) => {
          selectedItemObject.push(this.map[v]);
        });
      }
    }
  }
</script>
<style type="text/css">

</style>