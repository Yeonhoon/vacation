<template>
  <v-container>
    <v-layout col wrap>
      <v-flex xs12 class='d-flex justify-center mt-15'>
        <v-card elevation=0 class="text-center">
            <v-img src="../assets/snubh.jpg" max-width=500 />
            <v-card-text class="justify-center">
              <h1>디지털 헬스케어 연구사업부 휴가</h1>
            </v-card-text>
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
      </v-flex>
    </v-layout>
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
