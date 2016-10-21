<template>
  <div class="newss col-xs-12">
    <a class="btn btn-primary" v-link="{name:'newsCreate'}">创建</a>
    <v-list url="/message/news/list" :param.sync="param" :items.sync="items" v-ref:list>
      <ul class="list">
        <li v-for="item in items" class="item">
          <a v-link="{ name: 'newsDetail', params: {id: item.id}}">
            <p class="title">{{item.name}}</p>
            <p class="desc">{{item.desc}}</p>
          </a>
        </li>
      </ul>
    </v-list>
  </div>
</template>

<script type="text/babel">
  import vList from '../../common/bootstrap/v-list.vue';
  export default {
    data: function () {
      return {
        items: [],
        param: {
          keyword: ''
        }
      }
    },
    components: {
      vList
    },
    methods: {
      onSearch(param){
        _.extend(this.param, param);
        this.$refs.list.refresh(true);
      }
    }
  }
</script>

<style>

</style>
