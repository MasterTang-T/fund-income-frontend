import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'

const routes = [{
    path: '/',
    redirect: '/login'
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
router.beforeEach((to, from,next) =>{
  console.log(to, from)
  next()
})
export default router