import axios from 'axios';

const state = {
    vacations:[],
  };
  
const getters = {
    getVacations: state => state.vacations,
};

const actions = {
  async submitVacation({dispatch},data){
      await axios.post('submit',data)
      .then((res)=>{
          console.log(res)
      })
      .catch(err=>{
          console.error(err)
      })
      await dispatch('loadVacationList')
    },
  async loadVacationList({commit}){
     let {data}= await axios.get('vacations')
     console.log('actions stage',data)
     commit('saveVacations',data)
    }

};
  const mutations = {
    saveVacations(state, payload) {
      state.vacations = payload;
      console.log("mutation stage",state.vacations)
    },

  };
  
  export default {
    state,
    getters,
    actions,
    mutations
  };
