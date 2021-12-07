<template>
  <v-container>
    <v-layout column>
      <v-flex>
        <calendar></calendar>
      </v-flex>
      <v-flex mt-15>
        <requets></requets>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import calendar from '../components/Calendar'
import requets from '../components/Request.vue'
export default {
  components:{
    calendar,
    requets
  },
   
}
</script>