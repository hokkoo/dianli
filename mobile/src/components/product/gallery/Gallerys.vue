<template>
  <div class="gallerys">
    <list url="/product/gallery/list" :param.sync="param" :items.sync="items" height="400px" v-ref:gallerys>
      <slot>
        <li class="list-item" v-for="item in items">
          <card v-link="{name: 'galaryDetail', params: {id: item.id}}">
            <img slot="header" v-bind:src="item.images && item.images[0] && item.images[0].url" v-if="item.images"/>
            <div slot="content" class="card-padding">
              <p class="title">
                {{item.name || item.title}} <badge :text="item.images.length" v-if="item.images"></badge>
              </p>
            </div>
          </card>
        </li>
      </slot>
    </list>
  </div>
</template>

<script type="text/babel">
  import Card from '../../vux/card';
  import Group from '../../vux/group';
  import Badge from '../../vux/badge';
  import List from '../../common/pager/list.vue';

  export default {
    data: () => {
      return {
        items: [],
        param: {
          keyword: ''
        }
      }
    },
    methods: {
      onSearch(param){
        _.extend(this.param, param);
        this.$refs.gallerys.refresh(true);
      }
    },
    components: {
      Card,
      Group,
      List,
      Badge
    },
    created(){
    }
  }
</script>

<style>
.gallerys .item {
    float: left;
    width: 20%;
    box-sizing: border-box;
    margin: 6px 10px;
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
}
.gallerys .item.add-form {
    float: none;
    width: 100%;
    text-align: left;
}

.gallerys{
  min-height: 600px;
}

.gallerys .list-item .title {
    text-align: center;
}

</style>
