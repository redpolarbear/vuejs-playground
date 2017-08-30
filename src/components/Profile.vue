<template>
  <div>
    {{ $route.params.id }}
    <!-- {{ userProfile}} -->
    <pre>{{ profile }}</pre>
    <hr>
    <p>Get User</p>
    <pre>{{ getUser }}</pre>
    <p>{{ relationship }}</p>
    <hr>
    <button @click.prevent="followAction">{{ buttonText }}</button>
    <hr>
    <h2>Following:</h2>
    <pre>{{ followings }}</pre>
    <ul>
      <li></li>
    </ul>
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
      relationship: '',
      followings: []
    }
  },
  watch: {
    getUser: function (val) {
      this.relationshipCheck(val)
      this.getFollowings(val)
    }
  },
  computed: {
    ...mapGetters(['getUser']),
    buttonText: function () {
      return this.rela === 'not friend' ? 'Follow' : 'Following'
    }
  },
  async beforeRouteEnter (to, from, next) {
    try {
      const profile = await db.ref('usersProfile/' + to.params.id).once('value')
      next(vm => {
        vm.$data.profile = profile.val()
      })
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    relationshipCheck (val) {
      let vm = this
      db.ref('followings/' + val._id).child(this.profile._id).on('value', (snapshot) => {
        if (snapshot.val() === true) {
          vm.relationship = 'friend'
        } else {
          vm.relationship = 'not friend'
        }
      })
    },
    getFollowings (val) {
      let vm = this
      db.ref('followings/' + val._id).on('value', (snapshot) => {
        console.log(snapshot.val())
        vm.followings = []
        if (snapshot.val()) {
          snapshot.forEach((element) => {
            console.log(element.key)
            db.ref('usersProfile/' + element.key).once('value')
              .then((snap) => {
                vm.followings.push(snap.val().displayName)
              })
          })
        }
      })
    },
    async followAction () {
      // let updates = {}
      // updates['followings/' + this.getUser._id] = { [this.profile._id]: true }
      // updates['followers/' + this.profile._id] = { [this.getUser._id]: true }
      // db.ref().update(updates)
      const addFollowings = db.ref('followings/' + this.getUser._id).child(this.profile._id).set(true)
      const addFollowers = db.ref('followers/' + this.profile._id).child(this.getUser._id).set(true)
      await Promise.all([addFollowings, addFollowers])
    }
  }
}
</script>

<style>
  
</style>
