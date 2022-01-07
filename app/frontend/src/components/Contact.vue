<template>
  <v-container>
    <v-layout>
      <v-flex>
          <v-card
            elevation=0
            class="justify-center text-center"
            width=500
          >
            <v-card-title class="headline">
              Contact
            </v-card-title>
            <v-card-text>
              <v-text-field
                rounded
                label="이름"
                outlined
              >
              </v-text-field>
              <v-text-field
                rounded
                label="이메일"
                outlined
              >
              </v-text-field>
              <v-textarea
                rounded
                label="문의내용"
                outlined
              >
              </v-textarea>
            </v-card-text>
            <v-card-actions class="justify-center pa-5">
              <v-btn
                color="primary"
                rounded
                dark
                large
                width="200"
              >
                제출    
              </v-btn>  
            </v-card-actions>
        </v-card>
      </v-flex>    
    </v-layout>  
  </v-container>
</template>
<script>
export default {
  
}
</script>