<template>
  <div>
    <p>This is the Sign Up Page</p>
    <form @submit.prevent="signupByEmailandPassword()" novalidate>
      <input type="email" ref="email" placeholder="Email" v-model.trim="email" @input="$v.email.$touch()"/>
      <input type="password" ref="password" placeholder="Password" v-model="password" @input="$v.password.$touch()"/>
      <button type="submit">Sign Up</button>
    </form>
    <p>{{ email }}</p>
    <p>{{ password }}</p>
    <pre>{{ $v.email }}</pre>
    <pre>{{ $v.password }}</pre>
    <pre>{{ user }}</pre>
  </div>
</template>

<script>
import firebase from 'firebase'
import { required, minLength, email } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'

export default {
  name: 'signup',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(4)
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    signupByEmailandPassword () {
      // var email = document.getElementById('email').value;
      // var password = document.getElementById('password').value;
      // if (email.length < 4) {
      //   alert('Please enter an email address.');
      //   return;
      // }
      // if (password.length < 4) {
      //   alert('Please enter a password.');
      //   return;
      // }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function (error) {
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
        // [END_EXCLUDE]
      })
      // [END createwithemail]
    }
  }
}
</script>

<style>
  
</style>
