<template>
  <div>
    <p>This is the Sign Up Page</p>
    <form @submit.prevent="signupByEmailandPassword()" novalidate>
      <input type="text" ref="username" placeholder="User name" v-model.trim="username" @input="$v.username.$touch()" />
      <input type="email" ref="email" placeholder="Email" v-model.trim="email" @input="$v.email.$touch()" />
      <input type="password" ref="password" placeholder="Password" v-model="password" @input="$v.password.$touch()" />
      <button type="submit">Sign Up</button>
    </form>
    <p>{{ username }}</p>
    <p>{{ email }}</p>
    <p>{{ password }}</p>
    <pre>{{ user }}</pre>
    <pre>{{ $v.email }}</pre>
    <pre>{{ $v.password }}</pre>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '../firebase'
import { required, minLength, email } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'

export default {
  name: 'signup',
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  firebase () {
    return {
      usersProfile: db.ref('usersProfile')
    }
  },
  validations: {
    username: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async signupByEmailandPassword () {
      try {
        await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        this.$firebaseRefs.usersProfile.push({username: this.username})
      } catch (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // [START_EXCLUDE]
        if (errorCode === 'auth/weak-password') {
          alert('The password is too weak.')
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
