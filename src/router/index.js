import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/HomeRestaurants'),
    meta: { title: 'Lista de restaurantes' }
  },
  {
    path: '/panel/restaurants',
    name: 'panel',
    component: () => import('@/views/panel/PanelRestaurants')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LogIn')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/signup/SignUp')
  }
]

const router = new VueRouter({
  routes
})

export default router
