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
    <pre>{{ foList }}</pre>
    <ul>
      <li v-for="item in foList" :key="item._id">{{ item.displayName }}</li>
    </ul>
  </div>
</template>

<script>
import { db } from '../firebase'
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  name: 'profile',
  data () {
    return {
      profile: null,
      relationship: '',
      followings: [],
      foList: []
    }
  },
  watch: {
    profile: function (val) {
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
        db.ref('followings/' + vm.getUser._id).on('value', (snapshot) => {
          vm.$data.foList = []
          _.forEach(snapshot.val(), async (item, key) => {
            const foUser = await db.ref('usersProfile/' + key).once('value')
            vm.$data.foList.push(foUser.val())
          })
        })
        console.log('beforeRouterEnter getUser is', vm.getUser)
      })
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    relationshipCheck (val) {
      let vm = this
      db.ref('followings/' + this.getUser._id).child(val._id).on('value', (snapshot) => {
        if (snapshot.val() === true) {
          vm.relationship = 'friend'
        } else {
          vm.relationship = 'not friend'
        }
      })
    },
    getFollowings (val) {
      let vm = this
      db.ref('followings/' + this.getUser._id).on('value', (snapshot) => {
        console.log(snapshot.val())
        vm.followings = []
        _.forEach(snapshot.val(), async (item, key) => {
          console.log(item)
          console.log(key)
          const followingUser = await db.ref('usersProfile/' + key).once('value')
          vm.followings.push(followingUser.val())
        })
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
