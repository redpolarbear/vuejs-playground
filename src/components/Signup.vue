<template>
  <div>
    <p>This is the Sign Up Page</p>
    <form @submit.prevent="signupByEmailandPassword()" novalidate>
      <input type="text" ref="displayName" placeholder="User name" v-model.trim="displayName" @input="$v.displayName.$touch()" />
      <input type="email" ref="email" placeholder="Email" v-model.trim="email" @input="$v.email.$touch()" />
      <input type="password" ref="password" placeholder="Password" v-model="password" @input="$v.password.$touch()" />
      <button type="submit">Sign Up</button>
    </form>
    <p>{{ displayName }}</p>
    <p>{{ email }}</p>
    <p>{{ password }}</p>
    <ul>
      <li v-for="item in usersProfile" :key="item._id">{{ item._id}}</li>
    </ul>
    <pre>{{ getUser }}</pre>
    <!-- <pre>{{ getUserProfile }}</pre> -->
    <pre>{{ $v.email }}</pre>
    <pre>{{ $v.password }}</pre>
  </div>
</template>

<script>
import firebase from 'firebase'
import shortid from 'shortid'
import md5 from 'md5'
import { db } from '../firebase'
import { required, minLength, email, maxLength } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  name: 'signup',
  data () {
    return {
      displayName: '',
      email: '',
      password: ''
    }
  },
  firebase: {
    usersProfile: {
      source: db.ref('usersProfile')
    }
  },
  validations: {
    displayName: {
      required,
      maxLength: maxLength(30)
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
    ...mapGetters(['getUser', 'getUserProfile'])
  },
  methods: {
    async signupByEmailandPassword () {
      const defaultUserProfile = {
        _id: shortid.generate(),
        displayName: this.displayName,
        photoURL: `https://www.gravatar.com/avatar/${md5((this.email.trim()).toLowerCase())}?d=mm&s=200`,
        location: null,
        about: null
      }
      try {
        const newUser = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        const newUserProfile = await newUser.updateProfile({
          displayName: defaultUserProfile.displayName,
          photoURL: defaultUserProfile.photoURL
        })
        await Promise.all([newUser, newUserProfile])
        this.$firebaseRefs.usersProfile.child(newUser.uid).update({
          ...defaultUserProfile,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          updatedAt: firebase.database.ServerValue.TIMESTAMP
        })
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
