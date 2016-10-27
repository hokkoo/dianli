<template>
  <div class="image-upload">
  	<input type="file" name="file" class="file-loading" accept="image/*" multiple>
  </div>
</template>

<script type="text/babel">
  import {gallery as galleryType, company as companyType, about as aboutType, message as messageType} from '../_config/type.json';
  var messageTypeList =[];
  _.each(messageType, (v, key) => {
    messageTypeList.push(v);
  });
  export default {
    props: {
      type: {
        type: Number,
        default: 0
      }
    },
    data: function () {
      return {
        list: [],
        imageMap: {}
      }
    },
    methods: {
      reset(){
        this.$input.fileinput('clear');
        this.$set('imageMap', {});
        console.log(2);
      }
    },
    ready: function() {
    	var $input = $(this.$el).find('[type=file]');
      var url = '/common/image/save?type=' + (this.type || 0);
      if(this.type == companyType.image || this.type === aboutType.image){
        url = '/common/image/saveCompanyImage?type=' + (this.type || 0);
      }else if(messageTypeList.indexOf(this.type) != -1){
        url = '/common/image/saveMessageImage?type=' + this.type;
      }else if(galleryType.image === this.type){
        url = '/common/image/saveGalleryImage?type=' + this.type;
      }
      this.$input = $input;
      $input.fileinput({
	    uploadUrl: url,
	    autoReplace: true,
	    maxFileCount: 100,
	    allowedFileExtensions: ["jpg", "png", "gif", "png", "jpeg", "bmp"]
	});
      var _self = this;
      $input.on('filedeleted', function (e, key) {
      	console.log(key);
      });
      $input.on('fileuploaded', function (e, data, previewId, index) {
        console.log(1)
      	_self.imageMap[previewId] = data.response.data;
      });
      $input.on('filesuccessremove', function (e, id) {
        console.log(2)
      	delete _self.imageMap[id];
      });
    }
  }

  // TODO 样式如何动态引入
  // TODO 将插件做成引入方式
</script>
