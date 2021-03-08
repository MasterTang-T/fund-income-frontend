import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import Login from '../views/login.vue'

const routes = [{
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "Login" */ '../views/login.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router