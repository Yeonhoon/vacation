<template>
  <v-container>
    <v-layout column >
      <v-flex mt-15>
        <requets></requets>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import requets from '../components/Request.vue'
export default {
  components:{
    requets
  },
   
}
</script>