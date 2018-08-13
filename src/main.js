import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import './assets/fonts/iconfont.css'
import './assets/css/global.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = axios
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
