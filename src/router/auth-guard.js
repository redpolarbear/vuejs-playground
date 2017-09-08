import { store } from '../store'

export default (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
  // this route requires auth, check if logged in
  // if not, redirect to login page.
    if (!store.getters.user) {
      next({path: '/auth'})
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
}
