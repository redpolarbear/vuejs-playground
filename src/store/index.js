import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  getters: {
    getUser: (state) => {
      return state.user
    },
    getLoading: (state) => {
      return state.loading
    },
    getError: (state) => {
      return state.error
    }
  },
  actions: {
    async signUserIn ({commit}, payload) {
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        if (user) {
          const userProfile = await firebase.database().ref('usersProfile/' + user.displayName).once('value')
          commit('setLoading', false)
          commit('setUser', userProfile.val())
        }
      } catch (error) {
        // Handle Errors here.
        let errorCode = error.code
        let errorMessage = error.message
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          errorMessage = 'Wrong password.'
        }
        commit('setLoading', false)
        commit('setError', errorMessage)
        console.log(error)
      }
    },
    async signUserUp ({commit}, payload) {
      try {
        const newUser = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        const newUserProfile = await newUser.updateProfile({
          displayName: payload._id,
          photoURL: payload.photoURL
        })
        await Promise.all([newUser, newUserProfile])
        if (newUser) {
          const user = {
            ..._.omit(payload, 'password'),
            uid: newUser.uid
          }
          firebase.database().ref('usersProfile').child(payload._id).update({
            ...user,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
          })
          commit('setLoading', false)
          commit('setUser', user)
        }
      } catch (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // [START_EXCLUDE]
        if (errorCode === 'auth/weak-password') {
          errorMessage = 'The password is too weak.'
        }
        commit('setLoading', false)
        commit('setError', errorMessage)
        console.log(error)
      }
    }
  }
})
