<template>
  <div>
    <p>This is the Sign Up Page</p>
    <form @submit.prevent="onSignup" novalidate>
      <input type="text" ref="displayName" placeholder="User name" v-model.trim="displayName" @input="$v.displayName.$touch()" />
      <input type="email" ref="email" placeholder="Email" v-model.trim="email" @input="$v.email.$touch()" />
      <input type="password" ref="password" placeholder="Password" v-model="password" @input="$v.password.$touch()" />
      <input type="password" ref="confirmPassword" placeholder="Confirm Password" v-model="confirmPassword" @input="$v.confirmPassword.$touch()" />
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
import { required, minLength, email, maxLength } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  name: 'signup',
  data () {
    return {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  validations: {
    displayName: {
      required,
      maxLength: maxLength(15)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    confirmPassword: {
      required,
      minLength: minLength(6)
    }
  },
  computed: {
    ...mapGetters(['getUser']),
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
    }
  },
  watch: {
    getUser (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignup () {
      const defaultUserProfile = {
        _id: shortid.generate(),
        displayName: this.displayName,
        email: this.email,
        password: this.password,
        photoURL: `https://www.gravatar.com/avatar/${md5((this.email.trim()).toLowerCase())}?d=mm&s=200`,
        location: null,
        about: null
      }
      this.$store.dispatch('signUserUp', defaultUserProfile)
    }
  }
}
</script>

<style>

</style>
