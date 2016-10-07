<template>
  <div>
    <div class="center">
      `12
    </div>
    <group>
      <cell title="ex" link="/demo" value="演示">
        <span class="demo-icon" slot="icon" style="color:#F70968">&#xe633;</span>
      </cell>
    </group>
    <group>
      <cell title="Buy me a coffee" link="project/donate">
        <span class="demo-icon" slot="icon" style="color:red;">&#xe630;</span>
        <div class="badge-value" slot="value" class="vux-center-v">
          <badge text="捐赠"></badge>
        </div>
      </cell>
      <cell title="Github" link="http://github.com/airyland/vux" value="Star me">
        <span class="demo-icon" slot="icon" style="color:#35495e;">&#xe62f;</span>
      </cell>
    </group>
  </div>
</template>

<script>
import { Cell, Group, Badge } from './components/vux'
export default {
  components: {
    Cell,
    Group,
    Badge
  },
  data () {
    return {
    }
  }
}
</script>

<style>
.center {
  margin-top: 15px;
  text-align: center;
}
.vux-notice {
  color: #666;
  line-height: 40px;
}
.vux-title {
  vertical-align: middle;
  text-align: center;
  color: #04BE02;
  display: inline-block;
  width: 75px;
  height: 75px;
  line-height: 75px;
  border-radius: 50%;
}
body {
  font-family: Helvetica, sans-serif;
  background-color: #fbf9fe;
}
</style>
