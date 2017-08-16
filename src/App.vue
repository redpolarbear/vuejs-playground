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
export default {
  name: 'app',
  data: function () {
    return {
    }
  }
}
</script>

<style>

</style>
