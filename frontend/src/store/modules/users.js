import axios from 'axios';

const state = {
    user: null,
  };
  
const getters = {
    isAuthenticated: state => !!state.user,
    stateUser: state => state.user,
};

const actions = {
    async register({dispatch}, form) {
      console.log(form)
        await axios.post('/api/register', form);
      
      let UserForm = new FormData();
      UserForm.append('username', form.uname);
      UserForm.append('password', form.upw1);
      await dispatch('logIn',UserForm);
    },
    async logIn({dispatch}, user) {
      await axios.post('/api/login', user);
      await dispatch('viewMe');
    },
    async viewMe({commit}) {
      let {data} = await axios.get('users/whoami');
      await commit('setUser', data);
    },
    // eslint-disable-next-line no-empty-pattern
    async deleteUser({}, id) {
      await axios.delete(`user/${id}`);
    },
    async logOut({commit}) {
      // await axios.post('/logout')
      await commit('logout');
    }
  };
  
  const mutations = {
    setUser(state, username) {
      state.user = username;
    },
    logout(state, user){
      localStorage.removeItem(user)
      state.user = null
    },
  };
  
  export default {
    state,
    getters,
    actions,
    mutations
  };
