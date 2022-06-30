import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/HomeRestaurants')
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/CreateItem.vue')
  // },
  {
    path: '/create/item',
    name: 'create.item',
    component: () => import('@/views/home/HomeRestaurants'),
    meta: { title: 'Lista de restaurantes' }
  }
]

const router = new VueRouter({
  routes
})

export default router
