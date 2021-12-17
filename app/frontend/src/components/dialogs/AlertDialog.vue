<template>
  <v-card>
    <v-card-title>{{ headerTitle }}</v-card-title>
      <v-card-text>
        <slot name="alert">
          {{defaultMsg}}  
        </slot>      
      </v-card-text>
    <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn
      color="red darken-1"
      text
      v-if="isCancelNeeds"
      @click="$emit('cancel')"
    >
      취소
     </v-btn>
    <v-btn 
      class="ma-2 white-text" 
      color="blue darken-1"
      text
      @click="$emit('confirm')"
    >
      확인
    </v-btn> 
    </v-card-actions>
  </v-card>
</template>
<script>

export default {
  props:{
    headerTitle:{
      type: String,
      default: null
    },
    isCancelNeeds:{
      type: Boolean,
      default: false
    }
  },
  name: "AlertDialog",
  data: () => ({
    defaultMsg:"slot을 입력하세요",
  })
}
</script>