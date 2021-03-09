import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'
import tokenEvent from '../utils/utils'
const {
  get_token
} = tokenEvent;
const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "Login" */ '../views/login.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import( /* webpackChunkName: "Dashboard" */ '../views/dashboard.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from,next) =>{
  const token = get_token()
  if(token){
    next();
  }else{
    if (to.path === '/login') {
      next();
    } else {
      next({path: '/login'})
    }
  }
})
export default router