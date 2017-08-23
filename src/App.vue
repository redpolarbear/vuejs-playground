<template>
  <div>
    <!-- <img src="./assets/logo.png"> -->
    <router-link to="/home">Goto Home</router-link>
    <router-link to="/auth">Goto Auth</router-link>
    <router-link to="/signup">Goto Sign Up</router-link>   
    <router-view></router-view>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import firebase from 'firebase'

export default {
  name: 'app',
  data: function () {
    return {
    }
  },
  // computed: {
  //   ...mapState(['user'])
  // },
  beforeCreate () {
    firebase.auth().onAuthStateChanged((user) => {
      // initially user = null, after auth it will be either <fb_user> or false
      this.$store.commit('setUser', user ? { email: user.email, uid: user.uid } : false)
      if (user && this.$route.path === '/auth') {
        this.$router.replace('/')
      } else if (!user && this.$route.path !== '/auth') {
        this.$router.replace('/auth')
      }
    })
  }
}
</script>

<style>

</style>
