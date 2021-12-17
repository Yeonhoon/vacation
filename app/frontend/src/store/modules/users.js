import axios from 'axios';

const state = {
    user: null,
    verificationNumber:null,
  };
  
const getters = {
    isAuthenticated: state => !!state.user,
    stateUser: state => state.user,
    stateVerifNumber : state => state.verificationNumber

};

const actions = {
    async sendEmail({commit},data){
        var min = 10000;
        var max = 99999;
        var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
        // let form = new FormData();
        // form.append('email',data.email)
        // form.append('verifNum',ranNum)
        await axios.post('/email',{'email':data, 'verifNum':ranNum})
        .then((res)=>{
            console.log(res)
        })
        await commit('setVerifNum',ranNum)
    },

    async register({dispatch}, form) {
      console.log(form)
      await axios.post('/register', form);
      
      let UserForm = new FormData();
      UserForm.append('username', form.rid);
      UserForm.append('password', form.pw);
      await dispatch('logIn',UserForm);
      
    },

    

    async logIn({dispatch}, user) {
      await axios.post('/login', user);
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
    setVerifNum(state, verifNum){
      state.verificationNumber = verifNum
      console.log('저장 완료: ', verifNum)
    }
  };
  
  export default {
    state,
    getters,
    actions,
    mutations
  };
