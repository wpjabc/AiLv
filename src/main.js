// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
// import Home from './components/HelloFromVux'
import Vuex from 'vuex'
import router from './router/index.js'
import axios from 'axios'
import  { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)

Vue.use(VueRouter)
Vue.use(Vuex)

FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.$ajax = axios;



const myStore = new Vuex.Store({}) // 这里你可能已经有其他 module

myStore.registerModule('vux', { // 名字自己定义
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
})

router.beforeEach(function (to, from, next) {     //全局拦截器
  myStore.commit('updateLoadingStatus', {isLoading: true})
  setTimeout(function(){
    next()
  },500)
})

router.afterEach(function (to) {                  //全局拦截器

  document.body.scrollTop = 0;
  document.getElementsByTagName('body')[0].scrollTop = 0;
  document.documentElement.scrollTop = 0;
    
  myStore.commit('updateLoadingStatus', {isLoading: false})
})

/* eslint-disable no-new */
new Vue({
  router,
  store:myStore,
  render: h => h(App)
}).$mount('#app-box')
