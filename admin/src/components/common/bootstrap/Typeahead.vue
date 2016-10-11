<template>
  <div style="position: relative"
    v-bind:class="{'open':showDropdown}"
  >
    <input type="text" class="form-control"
      :placeholder="placeholder"
      autocomplete="off"
      v-model="value"
      @input="update"
      @keydown.up="up"
      @keydown.down="down"
      @keydown.enter= "hit"
      @keydown.esc="reset"
      @blur="showDropdown = false"
    />
    <div class="not-hit" v-show="showAdd && value && (!items || !items.length)">
      是否添加 {{value}} 
      <button type="button" class="not-hit-btn btn btn-primary" @click.prevent="addNotHitItem">
        +
      </button>
    </div>
    <ul class="dropdown-menu" v-el:dropdown>
      <li v-for="item in items" v-bind:class="{'active': isActive($index)}">
        <a @mousedown.prevent="hit" @mousemove="setActive($index)">
          <partial :name="templateName"></partial>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import {coerce} from '../../../utils/utils.js';

let Vue = window.Vue

export default {
  created () {
    if(this.primitiveData){
      this.items.length = 0;
      this.primitiveData.forEach( (item) => {
        this.items.push(item);
      });
    }
  },
  partials: {
    default: '<span v-html="item | highlight query"></span>'
  },
  props: {
    showAdd: {
      type: Boolean,
      default: false
    },
    value: {
      twoWay : true,
      type: String,
      default: ''
    },
    data: {
      type: Array
    },
    limit: {
      type: Number,
      default: 8
    },
    async: {
      type: String
    },
    template: {
      type: String
    },
    templateName: {
      type: String,
      default: 'default'
    },
    key: {
      type: String,
      default: null
    },
    matchCase: {
      type: Boolean,
      coerce: coerce.boolean,
      default: false
    },
    matchStart: {
      type: Boolean,
      coerce: coerce.boolean,
      default: false
    },
    onHit: {
      type: Function,
      default (items) {
        this.reset()
        this.value = items
      }
    },
    placeholder: {
      type: String
    }
  },
  data () {
    return {
      showDropdown: false,
      noResults: true,
      current: 0,
      items: []
    }
  },
  computed: {
    primitiveData () {
      if (this.data) {
        return this.data.filter(value => {
          value = this.matchCase ? value : value.toLowerCase()
          var query = this.matchCase ? this.value : this.value.toLowerCase()
          return this.matchStart ? value.indexOf(query) === 0 : value.indexOf(query) !== -1
        }).slice(0, this.limit)
      }
    }
  },
  ready () {
    // register a partial:
    if (this.templateName && this.templateName !== 'default') {
      Vue.partial(this.templateName, this.template)
    }
  },
  methods: {
    addNotHitItem(){
      this.$dispatch('addNotHitItem', this.value);
    },
    update () {
      if (!this.value) {
        this.reset()
        return false
      }
      if (this.data) {
        if(this.primitiveData){
          this.items.length = 0;
          this.primitiveData.forEach( (item) => {
            this.items.push(item);
          });
        }
        this.showDropdown = this.items.length > 0
      }
      if (this.async) {
        const _self = this;
        $.get(this.async + this.value).success(rtn => {
          if(rtn.successed){
            var data = rtn.data || [];
            var items = ((_self.key ? data[_self.key] : data) || []).slice(0, _self.limit);
            _self.items.length = 0;
            items.forEach( (item) => {
              _self.items.push(item);
            });
            console.log(1)
            _self.showDropdown = _self.items.length > 0
          }
        })
      }
    },
    reset () {
      this.items.length = 0;
      this.value = ''
      this.loading = false
      this.showDropdown = false
    },
    setActive (index) {
      this.current = index
    },
    isActive (index) {
      return this.current === index
    },
    hit (e) {
      e.preventDefault()
      this.onHit(this.items[this.current], this)
    },
    up () {
      if (this.current > 0) this.current--
    },
    down () {
      if (this.current < this.items.length - 1) this.current++
    }
  },
  filters: {
    highlight (value, phrase) {
      return value.replace(new RegExp('(' + phrase + ')', 'gi'), '<strong>$1</strong>')
    }
  }
}
</script>

<style>
.dropdown-menu > li > a {
  cursor: pointer;
}
.not-hit {
    background-color: #fff;
    margin-top: 3px;
    border: 1px solid #d2d6de;
    padding: 2px 12px;
}
</style>