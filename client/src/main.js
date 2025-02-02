import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import CKEditor from '@ckeditor/ckeditor5-vue'

Vue.config.productionTip = false

Vue.use(CKEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
