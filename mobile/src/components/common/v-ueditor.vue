<template>
  <div class="v-ueditor">
    <script v-bind:id="editorId" type="text/plain"></script>
  </div>
</template>

<script type="text/babel">
  // import '../../assets/lib/ueditor/js/ueditor.config.js';
  // import '../../assets/lib/ueditor/js/ueditor.all.js';
  // import '../../assets/lib/ueditor/lang/zh-cn/zh-cn.js';
  import uuid from 'uuid';
  // 借助ueditor来处理
  export default {
    props: {
      type: {
        type: Number,
        default: 0
      },
      content: String,
    },
    data: () => {
      return {
        editorId: uuid.v1()
      }
    },
    ready(id){
      var _self = this;
      this.ue = UE.getEditor(this.editorId, {
        imageUrl: "/common/image/savetmp?type="+ this.type,
        themePath: '/admin/assets/lib/ueditor/themes/',
        iframeCssUrl: '/admin/assets/lib/ueditor/themes/iframe.css',
        imageUrlPrefix: ''
        // codeMirrorJsUrl: '/admin/assets/lib/codemirror/codemirror.js',
        // codeMirrorCssUrl : '/admin/assets/lib/codemirror/codemirror.css'
      });
      this.ue.addListener("contentChange",function(){
          console.log('内容改变:');
          _self.content = _self.ue.getContent();
      });
    },
    methods: {
      getContent(){
        this.content = this.ue.getContent();
      },
      setContent(content){
        this.ue.ready( () => {
          this.ue.setContent(content);
        })
      }
    },
    watch: {
      content(newValue, oldValue){
        console.log(2)
        // TODO 需要做成同步格式
        return;
        if(this.content !== this.ue.getContent()){
          this.ue.setContent(this.content);
        }
      }
    }
  }
</script>
