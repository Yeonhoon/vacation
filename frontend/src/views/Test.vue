<template>
    <div>
      <v-textarea
        v-model="movies"
      ></v-textarea>
    </div>
</template>

<script>
  export default {
    created () {
      this.$http.get('/api/users')
        .then(res=>{
          console.log(res.data)
          this.movies = res.data
        })
  },
    data: ()=>({
      movies:[],
    })
}
</script>

<style scoped>

</style>