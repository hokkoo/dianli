<template>
  <div class="file-upload">
  	<input type="file" name="file" class="file-loading" accept="image/*" multiple>
  </div>
</template>

<script type="text/babel">
  import 'bootstrap-fileinput';

  export default {
	data: function () {
      return {
        list: []
      }
    },
    ready: function() {
    	var $input = $(this.$el).find('input');
      $input.fileinput({
	    uploadUrl: '/common/image/save',
	    autoReplace: true,
	    maxFileCount: 2,
	    allowedFileExtensions: ["jpg", "png", "gif"]
	});
      var list = this.list;
      var _self = this;
      $input.on('filedeleted', function (e, key) {
      	console.log(key);
      });
      $input.on('fileuploaded', function (e, data, previewId, index) {
      	list[previewId] = data.response.data;
      });
      $input.on('filesuccessremove', function (e, id) {
      	delete list[id];
      });
    },
    watch: {
      list: function () {
        console.log(this.list);
      }
    }
  }

  // TODO 样式如何动态引入
  // TODO 将插件做成引入方式
</script>
