<template>
  <div>
      mypage
      {{records}}
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  props:{
    records:{
        type:Array,
        default:null,
    }

  },

  data:()=>({
    x:null,
    
  }),
}
</script>