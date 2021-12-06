<template>
  <v-container>
    <v-row align='center'>
    </v-row>
    <v-card elevation=0 class="text-center">
        <img src="../assets/snubh.jpg" alt="" width=400>
        <h1>디지털 헬스케어 연구사업부 휴가</h1>
      <v-card-actions class='justify-center mt-10'>
         <v-btn
           text
           large
         >
           로그인
         </v-btn>
         <v-btn
           :to="{name:'Calendar'}"
           large
         >
          휴가신청
         </v-btn>
      </v-card-actions>
    </v-card>
    

  </v-container>
</template>

<script>

  export default {
    name: 'Home',

    components: {
    //   Logo,
    },
    data:()=>({
      
    })
  }
</script>
