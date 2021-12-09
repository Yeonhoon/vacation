const state ={
    alertDialogToggle: false,
    alertdialogInfo:null,
  }
  
  const getters = {
    getDialogToggle: state => state.alertDialogToggle,
    getDialogInfo: state => state.alertdialogInfo
  }
  
  const actions = {
    openDialog({commit}, info){
      commit('setDialog', info)
    },
    closeDialog({commit}){
      commit('initDialog')
    }
  }
  
  const mutations = {
    setDialog(state, payload){
      state.alertdialogInfo=payload
      state.alertDialogToggle=true
    },
    initDialog(state){
      state.alertdialogInfo=null
      state.alertDialogToggle=false
    }
  }
  
  export default {
    state,
    mutations,
    getters,
    actions
  }