// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex';
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import StarRating from 'vue-star-rating'

import store from './store/index'

Vue.config.productionTip = false
Vue.config.silent = true

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(MintUI)
Vue.component('star-rating', StarRating);
// let wrapper = document.querySelector('.wrapper')
// let scroll = new BScroll(wrapper)
// 导航钩子
// router.beforeEach((to, from, next) => {
//   if(store.state.user.userInfo===null){
//   	if (to.path!=='/login' && to.path!=='/register') {
//   		next();
//   	}else{
//   		next("/login");
//   	}
//   }else{
//   	next();
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App,}
})
