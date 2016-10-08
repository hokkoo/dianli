<template>
  <div class="contact-detail col-xs-12">
    <h3 class="title">
      {{contact.name}}
    </h3>
    <div>
      <span class="item">
        <label>
          真实姓名：
          <span>
            {{contact.realName}}
          </span>
        </label>
      </span>
      <span class="item">
        <label>
          身份证：
          <span>
            {{contact.IDCard}}
          </span>
        </label>
      </span>
      <span class="item">
        <label>
          公司：
          <span>
            {{contact.companyName}}
          </span>
        </label>
      </span>
    </div>
    <div>
      <span class="item">
        <label>
          部门：
          <span>
            {{contact.department}}
          </span>
        </label>
      </span>
      <span class="item">
        <label>
          邮箱：
          <span>
            {{contact.email}}
          </span>
        </label>
      </span>
      <span class="item">
        <label>
          地址：
          <span>
            {{contact.address}}
          </span>
        </label>
      </span>
    </div>
    <div class="desc">
      <h3 class="sub-title">
        简介
      </h3>
      {{contact.desc}}
    </div>
    <div class="content">
      <h3 class="sub-title">
        内容
      </h3>
      {{{contact.content}}}
    </div>
  </div>
</template>

<script type="text/babel">
  import {saveContact} from '../../../vuex/modules/product/contact/action.js';
  import { contact as contactType } from '../../_config/type.json';
  import {input as bsInput, formGroup, spinner, vSelect} from 'vue-strap';
  import imagePlate from '../../common/image-plate.vue';
  import vUeditor from '../../common/v-ueditor.vue';
  import getContactObject from './processor.js';

  export default {
    props: {
      contact: {
        type: Object,
        default: getContactObject
      }
    },
    data: () => {
      return {
        type: contactType
      }
    },
    methods: {
      save(){
        return this.saveContact(this.contact);
      }
    },
    vuex: {
      actions: {
        saveContact: saveContact
      }
    },
    components: {
      bsInput,
      formGroup,
      spinner,
      vUeditor,
      imagePlate
    }
  }
</script>
