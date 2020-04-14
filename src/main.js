import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import store from './store'
Vue.use(Vuelidate)



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
