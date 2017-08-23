<template>
  <div>
    <h1>This is the Auth (Login) Component</h1>
    <form @submit.prevent="loginWithEmailandPassword()" novalidate>
      <input type="email" ref="email" placeholder="Email" v-model.trim="email"/>
      <input type="password" ref="password" placeholder="Password" v-model="password"/>
      <button type="submit">Login</button>
    </form>
    <p>{{ email }}</p>
    <p>{{ password }}</p>
    <pre>{{ getUser }}</pre>
  </div>
</template>

<script>
import firebase from 'firebase'
// import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  name: 'auth',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getUserProfile'])
  },
  methods: {
    async loginWithEmailandPassword () {
      try {
        await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      } catch (error) {
        // Handle Errors here.
        let errorCode = error.code
        let errorMessage = error.message
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.')
        } else {
          alert(errorMessage)
        }
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
