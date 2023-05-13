import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2'
//import  pagination  from 'laravel-vue-pagination';

Vue.use(BootstrapVue)
Vue.use(VueSweetalert2)
//Vue.use( pagination  )

Vue.config.productionTip = false

Vue.component('pagination', require('laravel-vue-pagination'));

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
