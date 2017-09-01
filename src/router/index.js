import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Auth from '@/components/Auth'
import Home from '@/components/Home'
import Signup from '@/components/Signup'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: Profile,
      meta: { requiresAuth: true }
    }
  ]
})
