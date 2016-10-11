<template>
  <div class="contact-select col-xs-12">
      <typeahead
        :show-add="true"
        placeholder="请选取联系人"
        async="/user/contact/search?q="
        template-name="async"
        :template="asyncTemplate"
        :on-hit="selectCallback"
        key=""
        :limit:"10"
      ></typeahead>
    <div class="detail selected-contact">
      <h3 class="titel">
        联系人详情
      </h3>
      <contact-detail :contact="contact"></contact-detail>
    </div>
    <modal v-ref:modal cancel-text="取消" ok-text="确定" :show.sync="modalIsShowed">
      <div slot="modal-body" class="modal-body">
        <contact-edit :contact.sync="newContact"></newCoin-edit>
      </div>
    </modal>
  </div>
</template>

<script type="text/babel">
  import {saveContactNormal, createContact, editContact} from '../../../vuex/modules/product/contact/action.js';
  import { contact as contactType } from '../../_config/type.json';
  import {input as bsInput, formGroup, spinner, vSelect, modal} from 'vue-strap';
  import getContactObject from './processor.js';
  import contactDetail from '../../contact/contact/Contact.vue';
  import contactEdit from '../../contact/contact/ContactEdit.vue';
  import typeahead from '../bootstrap/Typeahead.vue';

  export default {
    name: 'contact-select',
    props: {
      contact: {
        type: Object,
        default: getContactObject
      }
    },
    data: () => {
      return {
        modalIsShowed: false,
        valid: false,
        type: contactType,
        newContact: getContactObject(),
        'asyncTemplate': '{{ item.name }}'
      }
    },
    methods: {
      selectCallback(item, targetVM) {
        const that = targetVM;
        that.reset()
        that.value = item.name;
        _.extend(this.contact, item);
      },
      addContact(){
        console.log(2)
       /* this.saveContactNormal(this.contact).then( (data) => {
          if(data){
            _.extend(this.contact, getContactObject());
            this.modalIsShowed = false;
          }
        })*/
      },
      cancel(){
        this.$dispatch('contactEditCancel');
      }
    },
    vuex: {
      actions: {
        editContact: editContact,
        createContact: createContact
      }
    },
    events: {
      addNotHitItem(value){
        this.contact.name = value;
        this.modalIsShowed = true;
      },
      contactEditSuccess(data){
        _.extend(this.newContact, getContactObject());
        this.modalIsShowed = false;
      }
    },
    components: {
      bsInput,
      spinner,
      contactDetail,
      contactEdit,
      typeahead,
      modal
    }
  }
</script>
