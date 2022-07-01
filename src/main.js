import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element'
import './plugins/vee-validate'
import store from './store'

// import '@/scss/index.scss' // global css
import 'element-ui/packages/theme-chalk/lib/index.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
