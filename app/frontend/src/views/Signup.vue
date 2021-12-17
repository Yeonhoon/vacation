<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-alert
              class="mb-3"
              :value="isSignupError"
              type="error" 
            >
              입력하신 값들을 확인해주세요!
            </v-alert>
            
            <v-card class="elevation-6" ref="form" width="100%">
              <v-toolbar dark color="primary">
                <v-toolbar-title>회원가입</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
              <validation-observer
                ref="observer"
              >
              <v-form>
                <validation-provider
                  v-slot="{ errors }"
                  name="ID"
                  rules="required|max:16|alpha_num"
                >
                  <v-text-field
                    class="pr-5 pl-5"
                    prepend-icon="mdi-key"
                    v-model="form.rid"
                    :counter="16"
                    :error-messages="errors"
                    label="사번"
                    hint="e.g: r0000"
                    required
                  ></v-text-field>
                    <!-- <v-dialog
                      v-model="dialog"
                    >
                      <template v-slot:activator="{on,attr}">
                        <v-btn 
                          text 
                          color="red darken-3"
                          @click="duplicationCheck"
                          v-bind="attr"
                          v-on="on"
                          width="70%"
                          class="ml-14"
                          outlined
                        >
                          중복확인
                        </v-btn>
                      </template>
                      <alert-dialog
                        :headerTitle="`아이디 중복확인`"
                        :isCancelNeeds=false
                        @confirm="dialog=false"
                      >
                        <template v-slot:alert>
                          <v-alert v-if="idCheck" type="success" >{{checkMessage}}</v-alert>
                          <v-alert v-else type="error" dense>{{checkMessage}}</v-alert>
                        </template>
                      </alert-dialog>
                    </v-dialog> -->
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  name="이름"
                  rules="required|max:16"
                >
                  <v-text-field
                    prepend-icon="person"
                    v-model="form.name"
                    :counter="16"
                    :error-messages="errors"
                    label="이름"
                    class="pr-5 pl-5"
                    required
                  ></v-text-field>
                </validation-provider>
                
                <validation-provider
                  v-slot="{ errors }"
                  name="email"
                  rules="required|email"
                >
                  <v-text-field
                    prepend-icon="email"
                    v-model="form.email"
                    :error-messages="errors"
                    label="이메일"
                    class="pr-5 pl-5"
                    required
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                  rules='required'
                  v-slot="{ errors }"
                  name="password1"
                >
                  <v-text-field 
                    prepend-icon="lock" 
                    v-model="form.pw" 
                    label="비밀번호" 
                    class="pr-5 pl-5"
                    :type="showpw ?'text' :'password'"
                    :append-icon="showpw ? 'mdi-eye' :'mdi-eye-off'"
                    :error-messages="errors"
                    @click:append="showpw = !showpw"
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                  rules='required|password:@password1'
                  v-slot="{ errors }"
                  name="password2"
                >
                  <v-text-field 
                    prepend-icon="lock" 
                    v-model="form.pw2" 
                    label="비밀번호 재입력"
                    class="pr-5 pl-5" 
                    :type="showpw ?'text' :'password'"
                    :append-icon="showpw ? 'mdi-eye' :'mdi-eye-off'"
                    :error-messages="errors"
                    @click:append="showpw = !showpw"
                  ></v-text-field>
                </validation-provider>
                
              </v-form>
            </validation-observer>
              </v-card-text>
              <v-card-actions>
                <!-- <v-btn text color="red" :to="{name:'Home'}">취소</v-btn> -->
                <v-btn text color="primary"
                  width="80%"
                  class="ml-10"
                  @click="submit">
                  가입
                </v-btn>
              </v-card-actions>
            </v-card>
            <v-card
              v-if="emailSent"
            >
              <v-text-field
                label="인증번호 입력"
                v-model="numFromEmail"
              >

                </v-text-field>
                <v-btn
                  @click="checkNumber"
                  color="error"
                  dense
                >인증</v-btn>

            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
// import AlertDialog from '../components/dialogs/AlertDialog.vue'
import { mapGetters, mapActions } from 'vuex'
import 'material-design-icons-iconfont/dist/material-design-icons.css' 
import myMixin from '../mixins/index'
export default {
//   components: { AlertDialog },
  mixins:[myMixin],
  data: () => ({
    form:{
      rid: null,
      name:null,
      email: null,
      pw: null,
      pw2: null,
      nov:15
    },
    emailSent:false,
    dialog:false,
    showpw:false,
    signupForm:false,
    isSignupError: false,
    checkMessage:null,
    idCheck:false,
    numFromEmail:null,
  }),
  computed:{
    ...mapGetters(['stateVerifNumber']),
    loadVerifNum(){
      console.log(this.stateVerifNumber)
      return this.stateVerifNumber
    }
  },

   methods: {
    ...mapActions(['register','sendEmail']),
    async duplicationCheck(){
      if(this.form.rid !== null){
        axios.get('/checkid/'+this.form.rid)
        .then(res=>{
          if(res.data===1){
            this.idCheck=true
            this.checkMessage="가입가능한 아이디입니다!"
          }
          else if(res.data ===0){
            this.idCheck=false
            this.checkMessage="이미 가입된 아이디입니다!"
            this.form.rid=null
          }
        })
      }
      else if(this.form.rid === null){
        this.checkMessage='사번을 입력하세요!'
      }
        
    },
    async submit(){
      this.$refs.observer.validate() //프로미스 객체: .then 등으로 호출
      .then((val)=>{
        if(val){
          this.sendEmail(this.form.email)
          .then(()=>{
            this.emailSent=true,
            console.log('이메일 발송 완료')
          })
        }
      })
    },
    async checkNumber(){
      console.log(this.numFromEmail)
      let x =this.loadVerifNum
      if (x === this.numFromEmail){
        this.register(this.form)
        .then(()=>{
            let dialogInfo = {
              emoji: "🙏🏻",
              title: "회원가입이 완료되었습니다!",
              firstLineText: "이용해주셔서 감사합니다",
              secondLineText: "by DiarGym",
              // timeout:2000,
            }
            this.$store.dispatch('openDialog', dialogInfo)
            this.$router.push({'name':'Home'})
        })
      }
    }
  },
}
</script>
<style>
  .warnings {
    color:red;
    font-size: small;
  }
</style>