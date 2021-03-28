import Vue from 'vue'
import VueRouter from 'vue-router'
import authToken from './before-guards/auth-token'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'relation',
    component: () => import(/* webpackChunkName: "about" */ '../views/relation.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '*',
    redirect: {
      name: 'relation'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(authToken)
export default router
