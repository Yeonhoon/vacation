import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import users from './modules/users'
import dialogs from './modules/dialog'
import vacations from './modules/vacations'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    users,
    dialogs,
    vacations
  },
  plugins:[createPersistedState()],
})
