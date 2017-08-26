<template>
  <div>
    {{ $route.params.id }}
    <!-- {{ userProfile}} -->
    <pre>{{ profile }}</pre>
    <hr>
    <p>Get User</p>
    <pre>{{ getUser }}</pre>
    <!-- <pre>{{ relationship }}</pre> -->
    <p>{{ rela }}</p>
    <hr>
    <button @click="followAction">Follow</button>
  </div>
</template>

<script>
import { db } from '../firebase'
import { mapGetters } from 'vuex'

export default {
  name: 'profile',
  data () {
    return {
      profile: null,
      rela: ''
    }
  },
  computed: {
    ...mapGetters(['getUser']),
    relationship: function () {
      if (this.getUser && this.profile) {
        console.log(this.profile.uid)
        db.ref('followings/' + this.getUser.uid).child(this.profile.uid).on('value', (snapshot) => {
          console.log(snapshot.val())
          if (snapshot.val() === true) {
            console.log('friends')
            this.rela = 'friends'
          } else {
            console.log('not friends')
            this.rela = 'not friends'
          }
          // if (snapshot.val() == null) {
          //   return 'not friends'
          // }
        })
        // return this.getUser.uid
      }
    }
  },
  async beforeRouteEnter (to, from, next) {
    const profile = await db.ref('usersProfile/' + to.params.id).once('value')
    console.log(profile.val())
    next(vm => {
      vm.$data.profile = profile.val()
    })
  },
  methods: {
    followAction () {

    }
  }
}
</script>

<style>
  
</style>
