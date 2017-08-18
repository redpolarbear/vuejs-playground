<<template>
  <div>
    <h1>This is the Home Component</h1>
    <button @click="logOut()">Log Out</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      photo: '',
      userId: '',
      name: '',
      email: '',
      user: {}
    }
  },
  computed: {
  },
  methods: {
    logOut () {
      firebase.auth().signOut()
    }
  }
}
</script>

<style>
  
</style>
