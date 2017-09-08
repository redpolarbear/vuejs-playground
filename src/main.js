// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import Vuelidate from 'vuelidate'
import VueBlu from 'vue-blu'
import * as firebase from 'firebase'
import 'vue-blu/dist/css/vue-blu.min.css'

import App from './App'
import router from './router'
import store from './store'
// import './firebase'

Vue.use(VueFire)
Vue.use(Vuelidate)
Vue.use(VueBlu)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.user) {
      next({
        path: '/auth'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    const fbConfig = {
      apiKey: 'AIzaSyBp-VoO4yMdfcJjHeG8rCLYmlovp634-yY',
      authDomain: 'vuejs-firebase-01-55b96.firebaseapp.com',
      databaseURL: 'https://vuejs-firebase-01-55b96.firebaseio.com',
      projectId: 'vuejs-firebase-01-55b96',
      storageBucket: 'vuejs-firebase-01-55b96.appspot.com',
      messagingSenderId: '687212823219'
    }
    firebase.initializeApp(fbConfig)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
})
