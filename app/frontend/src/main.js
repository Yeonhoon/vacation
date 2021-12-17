import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false
axios.interceptors.response.use(undefined, function(error){
    if (error){
      const originalRequest = error.config;
      if(error.response.status == 401 && !originalRequest._retry){
        originalRequest._retry = true;
        store.dispatch('logOut');
        return router.push('/login')
      }
    }
  })

//   export NODE_OPTIONS=--openssl-legacy-provider

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5050';
new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
