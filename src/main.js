import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './mock/mock'
import { VueAxios } from './utils/request'


Vue.config.productionTip = false
Vue.use(VueAxios)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
