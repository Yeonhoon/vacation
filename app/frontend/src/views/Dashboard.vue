<template>
  <v-container>
    <v-layout column >
      <v-flex mt-15 max-width=500>
        <calendar
          :records=loadVacations
        ></calendar>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex mt-15>
        <mypage
          :records=loadVacations
        ></mypage>
      </v-flex>
      <v-flex mt-15 ml-10>
        <div class="mb-3 ml-3">
          <h5>남은 휴가일수</h5>
        </div>
        <v-progress-circular
          :rotate="-90"
          :size="200"
          :width="50"
          :value=loadVacations[0].nov/15*100
          color="primary"
        >
            <strong>{{loadVacations[0].nov}}</strong>일
        </v-progress-circular>
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
      return this.getVacations
  },
//   watch:{
      
//     }
  },
  methods:{
    async retreiveVac(){
      this.$store.dispatch('loadVacationList')
    }
  },
  data:()=>({
      leftVac: loadVacations[0].nov/15*100
  }),
  
   
}
</script>