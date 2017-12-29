<template>
  <div id="app">
    <router-view></router-view>
    <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
import { Loading } from 'vux'
import { mapState } from 'vuex'
export default {
  name: 'app',
  components: {
    Loading
  },
  computed: {
    ...mapState({
      isLoading: state => state.vux.isLoading
    })
  }
}
</script>

<style lang="less">
@font-face {
  font-family: 'iconfont';
  src: url('../static/font/iconfont.eot');
  src: url('../static/font/iconfont.eot?#iefix') format('embedded-opentype'),
  url('../static/font/iconfont.woff') format('woff'),
  url('../static/font/iconfont.ttf') format('truetype'),
  url('../static/font/iconfont.svg#iconfont') format('svg');
}
.iconfont{
  font-family:"iconfont" !important;
  font-size:16px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

/*@import '~vux/src/styles/reset.less';*/

/*body {*/
   /*background-color: #fbf9fe;*/
 /*}*/
</style>
