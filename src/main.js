import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

//Routes
import VueRouter from 'vue-router'
import Routes from './Routes'

Vue.config.productionTip = false

//Routes
Vue.use(VueRouter)

//Routes
const router = new VueRouter({
  routes: Routes,
  mode: 'history' // remplace http://localhost:8080/#/Pages1 par http://localhost:8080/Pages1
})

new Vue({
  render: h => h(App),
  router: router //Routes
}).$mount('#app')
