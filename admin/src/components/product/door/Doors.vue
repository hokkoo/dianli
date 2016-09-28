<template>
  <h1>
    产品
    <a v-link="{ name: 'productDoorEdit'}">创建</a>
  </h1>
  <div class="list-wrapper products">
    <ul class="list-container" id="list-ul">
      <li v-for="item in items">
        <a v-link="{ name: 'productDoorDetail', params: {id: item.id}}">
          <p class="list-title">{{item.name}}</p>
          <p class="list-content">{{item.content}}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script type="text/babel">
  import {doors} from '../../../vuex/modules/product/door/getter.js';
  import {getDoors} from '../../../vuex/modules/product/door/action.js';

  export default {
    vuex: {
      getters: {
        items: doors
      },
      actions: {
        getList: getDoors
      }
    },
    created(){
      this.getList();
    }
  }
</script>

<style>
  .list-container li {
    border-bottom: 1px solid #eee;
  }

  .list-title {
    font-size: 2.6rem;
    font-weight: 400;
    color: #404040;
    margin-top: 0;
  }

  .list-abstract {
    font-size: 1.6rem;
    color: #919191;
    font-weight: 300;
  }

  .list-updated {
    font-family: "Comic Sans MS", curslve, sans-serif;
    font-size: 1.8rem;
    color: #8b8b8b;
    padding: 5px 0;
  }

  .list-container li a {
    padding: 1rem 1.5rem;
    display: block;
    transition: all .3s;
    margin:0;
  }

  .list-container li a:hover {
    background-color: Rgba(0, 0, 0, .02);
  }

  @media screen and (max-width: 768px) {
    .list-title {
      font-size: 2.2rem;
    }

    .list-updated {
      font-size: 1.6rem;
    }
  }
</style>
