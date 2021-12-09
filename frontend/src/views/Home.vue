<template>
  <v-container>
    <v-layout col wrap>
      <v-flex xs12 class='d-flex justify-center mt-15'>
        <v-card elevation=0 class="text-center">
            <v-img src="../assets/snubh.jpg" max-width=500 />
            <v-card-text class="justify-center">
              <h1>디지털 헬스케어 연구사업부 휴가</h1>
            </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-row v-if="isLogin" align="center" justify="center">
      <v-col>
        <div class="text-center">
          <div class="my-2">
            <v-btn :to="{name:''}" plain color='red lighten-1' rounded large width="250"><strong>운동일지 작성</strong></v-btn>
          </div>
          <div class="my-2">
              <v-btn :to="{name:''}" plain color='primary' rounded large width="250"><strong>대시보드</strong></v-btn>
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
    //   Logo,
    },
    computed:{
      isLogin(){
        return this.$store.getters.isAuthenticated;
      }
    },
    data:()=>({
      
    })
  }
</script>
