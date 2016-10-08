<template>
  <div class="tags">
    <h3 class="title">
      标签管理
    </h3>
    <div class="card door">
      <tags-edit :tags.sync="doorTags" :type="1"></tags-edit>
    </div>
  </div>
</template>

<script type="text/babel">
  import {tags} from '../../../vuex/modules/product/tag/getter.js';
  import {getTags} from '../../../vuex/modules/product/tag/action.js';
  import tagsEdit from '../../common/tags-edit.vue';

  export default {
    data: () => {
      return {
        doorTags: []
      }
    },
    vuex: {
      actions: {
        getTags: getTags
      }
    },
    components: {
      tagsEdit
    },
    created(id){
      this.getTags(1).then( (tags) => {
        _.each(tags, (tag) => {
          this.doorTags.push(tag);
        });
      });
    }
  }
</script>
