<template>
  <div class="contact-inline col-xs-12">
    <div class="normal-state" v-show="!edit">
      <contact-detail :contact.sync="contact"></contact-detail>
    </div>
    <div class="edit-state" v-show="edit">
      <contact-edit :contact.sync="newContact"></newCoin-edit>
    </div>
    <div class="opr pull-right">
      <span v-if="enableEdit" v-show="!edit" @click="edit = true">编辑</span>
      <span v-if="enableEdit" v-show="!edit" @click="deleteItem(item)">删除</span>
    </div>
  </div>
</template>

<script type="text/babel">
  import {contact} from '../../../vuex/modules/product/contact/getter.js';
  import {getContact} from '../../../vuex/modules/product/contact/action.js';
  import contactDetail from './Contact.vue';
  import contactEdit from './ContactEdit.vue';
  import getContactObject from './processor.js';

  export default {
    props: {
      enableEdit: {
        type: Boolean,
        default: true
      },
      contact: {
        type: Object,
        default: getContactObject
      }
    },
    data: () => {
      return {
        edit: false,
        newContact: getContactObject()
      }
    },
    components: {
      contactEdit,
      contactDetail
    },
    created(id){
      if(this.contact.id){
        _.extend(this.newContact, this.contact);
      }
    },
    events: {
      contactEditSuccess(data){
        console.log(111);
        _.extend(this.contact, data);
        this.edit = false;
      },
      contactEditCancel(){
        this.edit = false;
      }
    }
  }
</script>
<style type="text/css">
.contact-inline .contact-detail .content {
    min-height: 10px;
    padding: 0;
}

.contact-inline .contact-detail .sub-title {
    font-size: 14px;
    margin: 0;
    padding: 4px 0;
    color: #333;
}

.contact-inline {
    position: relative;
}

.contact-inline > .opr {
    position: absolute;
    right: 0;
}

.contact-inline .contact-detail > .title {
    margin-top: 0;
}
</style>