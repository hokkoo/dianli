<template>
  <div class="tags-edit">
    <spinner v-ref:spinner size="sm" fixed="false" text="加载中..."></spinner>
    <ul class="tags">
      <li class="item" v-for="item in tagsForEdit">
        <div class="normal-state" v-show="!item.edit">
          <span>{{item.title}}</span>
          <div class="opr">
            <span class="edit" @click="editItem(item)"><i class="fa fa-edit"></i></span>
            <span class="delete" @click="deleteItem(item)"><i class="fa fa-times"></i></span>
          </div>
        </div>
        <div class="edit-state" v-show="item.edit">
          <form-group :valid.sync="item.valid">
            <bs-input label="标签名称" required :value.sync="item.newTitle"></bs-input>
            <button type="button" class="btn btn-primary" :disabled="!item.valid" @click="save(item)">保存</button>
            <button type="button" class="btn btn-warn" @click="cancel(item)">取消</button>
          </form-group>
        </div>
      </li>
      <div class="create-state">
          <form-group :valid.sync="newItem.valid">
            <bs-input label="标签名称" required :value.sync="newItem.title"></bs-input>
            <button type="button" class="btn btn-primary" :disabled="!newItem.valid" @click="save(newItem)">保存</button>
            <button type="button" class="btn btn-warn" @click="cancel(newItem)">取消</button>
          </form-group>
          <form-group :valid.sync="newItems.valid">
            <bs-input label="标签名称" required :value.sync="newItems.title"></bs-input>
            <button type="button" class="btn btn-primary" :disabled="!newItems.valid" @click="saveAll(newItems)">批量导入</button>
            <button type="button" class="btn btn-warn" @click="cancel(newItems)">取消</button>
          </form-group>
        </div>
    </ul>
  </div>
</template>

<script type="text/babel">
  import {tags} from '../../vuex/modules/product/tag/getter.js';
  import {getTags, saveTags, saveTag, editTag, deleteTag} from '../../vuex/modules/product/tag/action.js';
  import {input as bsInput, formGroup, spinner} from 'vue-strap';

  export default {
    data: () => {
      return {
        tagsForEdit: [],
        newItem: {
          title: '',
          valid: false
        },
        newItems: {
          title: '',
          valid: false
        }
      }
    },
    props: {
      tags: {
        type: Array,
        default: () => []
      },
      type: {
        type: Number,
        default: 0
      }
    },
    vuex: {
      actions: {
        saveTags: saveTags,
        saveTag: saveTag,
        editTag: editTag,
        deleteTag: deleteTag
      }
    },
    methods: {
      saveAll(item){
        this.$refs.spinner.show();
        var names = item.title.split(/,/g);
        var tags = [];
        _.each(names, (name) =>{
          tags.push({
            title: name,
            type: this.type
          });
        });
        this.saveTags(tags).then( (data) => {
          this.$refs.spinner.hide();
          if(data){
            item.title = '';
            item.valid = false;
            _.each(data.tags, (tag) => {
              tag.newTitle = tag.title;
              tag.edit = false;
              tag.valid = false;
              this.tagsForEdit.push(tag);
            })
          }
        });
      },
      editItem(item){
        item.edit = true;
      },
      deleteItem(item){
        this.$refs.spinner.show();
        this.deleteTag(item).then( () => {
          this.$refs.spinner.hide();
          _.each(this.tagsForEdit, (tag, idx) => {
            if(tag.id === item.id){
              this.tagsForEdit.splice(idx, 1);
            }
            return false;
          });
        });
      },
      save(item){
        this.$refs.spinner.show();
        if(item.id){
          var _item = _.extend({}, item);
          _item.title = item.newTitle;
          this.editTag(_item).then( (successed) => {
            if(successed){
              item.title = item.newTitle;
              item.edit = false;
            }
            this.$refs.spinner.hide();
            // TODO vuex列表的同步问题，暂不在这里进行同步
            // _.each(this.tags, (tag) => {

            // })
          });
        }else{
          item.type = this.type;
          this.saveTag(item).then( (data) => {
            if(data){
              this.tagsForEdit.push(_.extend({}, item))
              item.title = '';
              item.id = '';
              item.edit = false;
            }
            this.$refs.spinner.hide();
          });
        }
      },
      cancel(item){
        item.valid = false;
        if(item.id){
          item.edit =false;
          item.newTitle = item.title;
        }else{
          item.title = ''
        }
      }
    },
    watch: {
      tags(){
        var tags = this.tags;
        console.log(2)
        _.each(tags, (tag) => {
          tag = _.extend({}, tag);
          tag.newTitle = tag.title;
          tag.edit = false;
          tag.valid = false;
          /*Vue.set(tag, 'newTitle', '');
          Vue.set(tag, 'edit', false);
          Vue.set(tag, 'valid', false);*/
          this.tagsForEdit.push(tag);
        });
      }
    },
    components: {
      bsInput,
      formGroup,
      spinner
    },
    created(id){
    }
  }
</script>
<style type="text/css">
  .tags-edit .tags .item .opr {
    display: inline-block;
    margin-left: 40px;
    vertical-align: middle;
}

.tags-edit .tags .item{
    padding: 5px 10px;
    display: inline-block;
    float: left;
    margin: 0px 20px 20px 0;
    border: 1px solid #d0cfcf;
}

.tags-edit .create-state {
    width: 150px;
}
</style>