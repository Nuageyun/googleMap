import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import router from './router'
import store from './store'
import './styles/app.less'
import VueBemHelper from '@/vendor/vue-bem-helper'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(VueBemHelper)
Vue.use(VueGoogleMaps, {
  load: {
    key: '',
    libraries: 'places'
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
