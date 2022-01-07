<template>
  <v-container>
    <v-layout col wrap>
      <v-flex xs12 class='d-flex justify-center mt-15'>
        <v-card elevation=0 class="text-center">
            <v-img src="../assets/snubh.jpg" max-width=500 />
            <v-card-subtitle>
              <h1>디지털헬스케어 연구사업부 휴가신청</h1>
            </v-card-subtitle>
            <v-card-text 
              v-if="isLogin"
              class="justify-center mt-10">
              <h3><strong>{{currentUser}}</strong>님 반갑습니다!</h3>
            </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-row v-if="isLogin" align="center" justify="center">
      <v-col>
        <div class="text-center" v-if="currentUser==='drofthee99'">
          <div class="my-2" >
            <v-btn :to="{name:'Dashboard'}" plain color='red lighten-1' rounded large width="200"><strong>휴가 관리</strong></v-btn>
          </div>  
        </div>
        <div class="text-center" v-else>
          <div class='my-2'>
            <v-btn :to="{name:'Request'}" color='red lighten-1' dark rounded large width="200"><strong>휴가 신청</strong></v-btn>
          </div>
          <div class="my-2">
            <v-btn :to="{name:'Dashboard'}" color='blue lighten-1' dark rounded large width="200"><strong>마이 페이지</strong></v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row v-else align="center" justify="center">
      <v-col>
        <div class="text-center">
          <div class="my-2">
            <v-btn :to="{name:'Signin'}" plain color='red lighten-1' rounded large width="250">로그인</v-btn>
          </div>
          <div class="my-2 pt-3">
              <v-btn :to="{name:'Signup'}" plain color='primary' rounded large width="250">회원가입</v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  export default {
    name: 'Home',
    components: {
    },
    async created(){
      if (isLogin()){
        this.retreiveVac()

      }
    },

    computed:{
      isLogin(){
        return this.$store.getters.isAuthenticated;
      },
      currentUser(){
        return this.$store.getters.stateUser.rid;
      }
    },

    methods:{
    async retreiveVac(){
      this.$store.dispatch('loadVacationList')
    }
  }
  }
</script>
