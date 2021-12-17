import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import state from '../store/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Signin.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue')
  },
  {
    path: '/verification',
    name: 'Verification',
    component: () => import(/* webpackChunkName: "about" */'../views/Verification.vue')
  },
  {
    path:'/request',
    name: 'Request',
    component: () => import('../views/Form.vue'),
    meta:{requiresAuth: true}
  },
  {
    path:'/board',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta:{requiresAuth: true}
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL
})

router.beforeEach((to,from,next)=>{
    if (to.matched.some(record => record.meta.requireAuth)){
      if(state.getters.isAuthenticated){
        next();
        return
      }
      next('/signin');
    } else {
      next();
    }
  })

export default router
