<template>
  <div>
    <h1>This is the Auth (Login) Component</h1>
    <form @submit.prevent="loginByEmailandPassword" novalidate>
      <input type="email" ref="email" placeholder="Email" v-model.trim="email"/>
      <input type="password" ref="password" placeholder="Password" v-model="password"/>
      <button type="submit">Login</button>
    </form>
    <p>{{ email }}</p>
    <p>{{ password }}</p>
  </div>
</template>

<script>
// import firebase from 'firebase'

export default {
  name: 'auth',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  mounted () {
  },
  methods: {
    loginByEmailandPassword: function () {

    }
  }
}
</script>

<style>

</style>
