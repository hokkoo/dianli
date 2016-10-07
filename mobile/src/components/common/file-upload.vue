<template>
  <div class="file-upload">
  	<input id="input-repl-2" name="inputrepl2[]" type="file" class="file-loading" accept="image/*" multiple>
  </div>
</template>

<script type="text/babel">
  import 'bootstrap-fileinput';

  export default {
    created(id){
      this.getItem(this.$route.params.id);
    }
  }
</script>
