<template>
  <div class="v-pager">
    <ul class="pager">
      <li class="prev item" @click="prev" v-show="current > 0">
        上一页
      </li>
      <li class="item" v-for="item in availablePages" @click="jump(item)" :class="{'active': current===item}"></li>
      <li class="next item" @click="next" v-show="current < total - 1">
        下一页
      </li>
      <li class="last item" @click="goLast" v-show="current < total - 1">
        最后一页
      </li>
    </ul>
  </div>
</template>
this.$emit('pulldown:loading', this.uuid) 
<script type="text/babel">
  export default {
    props: {
      current: {
        type: Number,
        default: 0
      },
      total: {
        type: Number,
        default: 10
      },
      maxLinePage: {
        type: Number,
        default: 10
      }
    },
    data: () => {
      return {
        availablePages: []
      }
    },
    methods: {
      next(){
        this.jump(++this.current);
      },
      prev(){
        this.jump(--this.current);
      },
      goLast(){
        this.jump(this.total - 1);
      },
      jump(){
        this.$emit('pager:jump', this.current)
      }
    },
    computed: {
      _availablePages(){
        var current = this.current, total = this.total, maxLinePage = this.maxLinePage, _mid = Math.floor(maxLinePage / 2);
        this.availablePages.splice(0, this.availablePages.length);
        var arr = [];
        if(total <= maxLinePage){
          arr = makeArray(0, total);
        }else{
          if(current <= _mid){
            arr = makeArray(0, maxLinePage);
          }else if(current + _mid <= total - 1){
            arr = makeArray(current - _mid, maxLinePage - current + _mid);
          }else{
            arr = makeArray(total - maxLinePage, total);
          }
        }
        arr.forEach((v) => {
          this.availablePages.push(v);
        });
      }
    }
  }

  function makeArray (start, end) {
    let arr = [];
    for(let i = star; i < end; i++){
      arr.push(i);
    }
    return arr;
  }
</script>
<style>
.v-pager{
  
}
</style>