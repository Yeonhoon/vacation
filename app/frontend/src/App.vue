<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <v-btn
         text
         exact
         primary
         :to="{name:'Home'}"
        >
          Home
        </v-btn>
        <v-btn
          v-if="isLogin"
          text
          primary
          exact
          :to="{name:'Request'}"
        >
          휴가신청
        </v-btn>
        <v-btn
          v-if="isLogin"
          text
          primary
          exact
          :to="{name:'Dashboard'}"
        >
          마이페이지
        </v-btn>
          <v-btn
            v-if="isLogin"
            text
            exact
            @click="logout"
          >
          로그아웃
        </v-btn>
         <v-btn
          text
          exact
          primary
          :to="{name:'Contact'}"
        >
          Contact
        </v-btn>
      </div>
      
    
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  computed:{
    isLogin(){
      return this.$store.getters.isAuthenticated;
    }
  },
  methods:{
    async logout(){
      await this.$store.dispatch('logOut');
      this.$router.push('/')
    }
  },
};
</script>
