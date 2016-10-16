<template>
  <div class="list">
    <!-- 上拉刷新 -->
    <scroller lock-x scrollbar-y use-pullup :height="height+'px'" @pullup:loading="scrollerRefresh">
      <ul class="list">
        <li class="list-item" v-for="item in items">
          <slot></slot>
        </li>
      </ul>
    </scroller>
  </div>
</template>

<script type="text/babel">
  import Scroller from '../../vux/scroller';
  /*
    事件列表：
    1，item-processor，对于每一个获取的item，若有处理，则进行处理
    2，items-processor，对于每一次获取的items
    3，fetch-success，在新获取的内容正常添加到列表之后触发
  */ 

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
        type: Number,
        default: 200
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
    methods: {
      next(){
        if(this.pager.start < this.pager.totalPage - 1){
          this.pager.start++;
          this.refresh();
        }
      },
      reset(){
        _.extend(this.pager, DEFAULT_PAGER());
        this.next();
      },
      scrollerRefresh(){
        this.uuid = uuid;
        this.next();
      },
      refresh(){
        var pager = this.pager;
        var isScroll = this.type === 0;
        this.$http.get(this.url, _.extend({}, this.param, {start: pager.start * pager.take, take: pager.take})).then((rtn) => {
          rtn = rtn && rtn.data || {};
          if(rtn.successed){
            if(!isScroll){
              this.items.splice(0, this.items.length);
            }
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
            if(isScroll){
              if((pager.start + 1) * pager.take <= pager.total){
                this.$broadcast('pullup:done', this.uuid)
              }else{
                this.$broadcast('pullup:reset', this.uuid)
              }
            }
          }
        })
      }
    },
    components: {
      Scroller
    },
    created(id){
      if(!this.lazy){
        this.refresh();
      }
    },
    watch: {
      param(newVal){
        console.log(newVal);
        this.reset();
        this.refresh();
      }
    }
  }
</script>
