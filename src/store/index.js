import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    userProfile: null
  },
  mutations: {
    setUser (state, value) {
      state.user = value
    },
    setUserProfile (state, payload) {
      state.userProfile = payload
    }
  },
  getters: {
    getUser: state => {
      return state.user
    },
    getUserProfile: state => {
      return state.userProfile
    }
  }
})
