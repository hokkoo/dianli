<template>
  <h1 class="text-center">产品</h1>
  <section class="content">
    <div class="row" v-if="servers">
      <div class="col-md-4" v-for="product in products">
        <div class="box box-{{product.status}}">
          <div class="box-header with-border">
            <i class="fa fa-{{product.icon}} fa-2x"></i>
            <h3 class="box-title">{{product.name}}</h3>
          </div>
          <div class="box-body">
            <span>{{product.description}}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  export default {
    name: 'Servers',
    data: function () {
      return {
        products: [{
          name: '门',
          status: 'success',
          icon: 'globe',
          description: '门业'
        }, {
          name: '洁具',
          status: 'danger',
          icon: 'database',
          description: '洁具'
        }]
      }
    }
  }
</script>

<style>
</style>
