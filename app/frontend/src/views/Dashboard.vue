<template>
  <v-container>
    <v-layout column >
      <v-flex mt-15>
        <calendar
          :records=loadVacations
        ></calendar>
      </v-flex>
      <v-flex mt-15>
        <mypage
          :records=loadVacations
        ></mypage>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import calendar from '../components/Calendar'
import mypage from '../components/Mypage'
import { mapGetters } from 'vuex'
export default {
  components:{
    calendar,
    mypage,
  },
  async created(){
    this.retreiveVac()
  },
  computed:{
      ...mapGetters(['getVacations']),
    loadVacations(){
        console.log(this.getVacations)
      return this.getVacations
  },
//   watch:{
      
//     }
  },
  methods:{
      async retreiveVac(){
        this.$store.dispatch('loadVacationList')
    }
  }
  
   
}
</script>