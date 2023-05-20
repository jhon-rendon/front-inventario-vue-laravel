import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2'
//import VeeValidate from 'vee-validate';
import Vuelidate from 'vuelidate'

Vue.use(BootstrapVue)
Vue.use(VueSweetalert2)
//Vue.use(VeeValidate);

Vue.use(Vuelidate)

Vue.config.productionTip = false

Vue.component('pagination', require('laravel-vue-pagination'));

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
