// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App'
import router from './router'

import firebase from 'firebase'
import Vuelidate from 'vuelidate'

Vue.use(VueFire)
Vue.use(Vuelidate)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data () {
    return {
      isAuthenticated: false
    }
  },
  template: '<App/>',
  components: { App },
  created () {
    // Initialize Firebase
    let config = {
      apiKey: 'AIzaSyBp-VoO4yMdfcJjHeG8rCLYmlovp634-yY',
      authDomain: 'vuejs-firebase-01-55b96.firebaseapp.com',
      databaseURL: 'https://vuejs-firebase-01-55b96.firebaseio.com',
      projectId: 'vuejs-firebase-01-55b96',
      storageBucket: 'vuejs-firebase-01-55b96.appspot.com',
      messagingSenderId: '687212823219'
    }
    firebase.initializeApp(config)
  }
})
