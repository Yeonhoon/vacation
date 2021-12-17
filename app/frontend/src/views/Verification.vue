<template>
  <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-text-field
              label="인증번호"
              v-model=verifNum
            >
            </v-text-field>
            <v-btn
              @click="checkNum"
            >
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
  </v-main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data:()=>({
    verifNum:null
  }),
  computed:{
    ...mapGetters(['stateVerifNumber']),
    loadVerifNum(){
      return this. stateVerifNumber
    }
  },
  methods:{
    ...mapActions(['register']),
    checkNum(){
      if (this.verifNum === this.loadVerifNum){
        console.log('인증 완료.')
      } else {
        console.log('번호가 다릅니다!')
        this.register()
      }
    }
  }
}
</script>

<style>

</style>