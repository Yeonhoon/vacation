import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import dialogs from './modules/dialog'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    users,
    dialogs,
  }
})
