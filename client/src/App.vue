<template>
  <div id="app">
    <Navbar/>
    <router-view/>
    <!-- <Footer/> -->
  </div>
</template>

<script>
import Navbar from './components/Navbar'

// import Footer from './components/Footer'
export default {
  name: 'app',
  components: {
    Navbar
  },
  created () {
    if (localStorage.getItem('access_token')) {
      this.$store.commit('LOGIN_STATUS_CHANGE', true)
      this.$store.commit('LOGIN_NAME_CHANGE', localStorage.getItem('name'))

      // this.$router.push({path:'/'})
    }
  }
}
</script>

<style>

</style>
