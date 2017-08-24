<template>
  <div>
    {{ $route.params.id }}
    <!-- {{ userProfile}} -->
    <pre>{{ profile }}</pre>
  </div>
</template>

<script>
import { db } from '../firebase'

export default {
  name: 'profile',
  data () {
    return {
      profile: null
    }
  },
  async beforeRouteEnter (to, from, next) {
    const profile = await db.ref('usersProfile/' + to.params.id).once('value')
    console.log(profile.val())
    next(vm => {
      vm.$data.profile = profile.val()
    })
  }
}
</script>

<style>
  
</style>
