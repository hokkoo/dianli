<template>
  <div class="contacts">
    <h3 class="title">
      联系人管理
    </h3>
    <div class="card">
      <ul>
        <li class="item" v-for="contact in contacts">
          <contact-inline :contact.sync="contact"></contact-inline>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/babel">
  import {getContacts} from '../../../vuex/modules/product/contact/action.js';
  import contactInline from './Contact-Inline.vue';
  import getContactObject from './processor.js';

  export default {
    data: () => {
      return {
        contacts: []
      }
    },
    vuex: {
      actions: {
        getContacts: getContacts
      }
    },
    components: {
      contactInline
    },
    created(id){
      this.getContacts().then( (contacts) => {
        _.each(contacts, (contact) => {
          this.contacts.push(contact);
        })
      });
    }
  }
</script>
