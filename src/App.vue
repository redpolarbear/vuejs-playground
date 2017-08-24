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
import { db } from './firebase'

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
      if (user) {
        db.ref('usersProfile/' + user.displayName).on('value', (snapshot) => {
          this.$store.commit('setUser', Object.assign({ email: user.email }, snapshot.val()))
        })
      } else {
        this.$store.commit('setUser', false)
      }
      if (user && this.$route.path === '/auth') {
        this.$router.replace('/')
      } else if (!user && this.$route.path !== '/auth') {
        this.$router.replace('/auth')
      }
    })
  },
  beforeDestroy () {
    firebase.database().ref().off()
    console.log('before destroy')
  }
}
</script>

<style>

</style>
