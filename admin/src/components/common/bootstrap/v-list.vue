<template>
  <div class="v-list">
    <slot></slot>
    <v-pager @pager:jump="fetch" :current.sync="pager.start" :total.sync="pager.totalPage"></v-pager>
  </div>
</template>
<script type="text/babel">
  import vPager from './v-pager.vue';

  const DEFAULT_PAGER = () => {
    return {
      start: 0,
      take: 10,
      total: 10,
      totalPage: 1,
      count: 0
    }
  };
  export default {
    props: {
      height: {
        type: String,
        default: "auto"
      },
      refreshToTop: {
        type: Boolean,
        default: true
      },
      type: {
        type: Number,
        default: 0 //列表类型 ：0， scroller；1， pager；
      },
      pager: {
        type: Object,
        default: DEFAULT_PAGER
      },
      param: {
        type: Object,
        default: () => {
          return {}
        }
      },
      items: {
        type: Array,
        default: () => []
      },
      url: {
        type: String,
        default: ''
      },
      lazy: {
        type: Boolean,
        default: false
      }
    },
    components: {
      vPager
    },
    methods: {
      next(){
        if(this.pager.start < this.pager.totalPage - 1){
          this.pager.start++;
          this.fetch();
        }
      },
      reset(){
        _.extend(this.pager, DEFAULT_PAGER());
        this.items.splice(0, this.items.length);
        this.next();
      },
      scrollerRefresh(uuid){
        this.uuid = uuid;
        this.next();
      },
      refresh(refreshToTop){
        this.reset();
        this.fetch(refreshToTop);
      },
      fetch(refreshToTop){
        var pager = this.pager;
        this.$http.get(this.url, _.extend({}, {param: this.param}, {start: pager.start * pager.take, take: pager.take})).then((rtn) => {
          var _self =this;
          rtn = rtn && rtn.data || {};
          if(rtn.successed){
            this.items.splice(0, this.items.length);
            if(rtn.total){
              pager.total = rtn.total;
              pager.totalPage = Math.ceil(pager.total/pager.take);
            }
            if(rtn.data){
              this.$emit('items-processor', rtn.data);
            }
            _.each(rtn.data, (item) => {
              this.$emit('item-processor', item);
              this.items.push(item);
            });
            this.$emit('fetch-success', this.items, rtn.data);
          }
        })
      }
    },
    compiled () {
      if(!this.lazy){
        this.refresh();
      }
    }
  }
</script>
<style>
.v-pager{

}
</style>