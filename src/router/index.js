import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '../views/login'
import Register from '../views/register'
import Forgetpw from '../views/forgetpw'
import Index from '../views/index/index'
import Received from '../views/index/received'
import Eye from '../views/index/eye'
import My from '../views/index/my'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/index/received'
      
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
    	path:'/register',
        component:Register
    },
    {
    	path:'/forgetpw',
    	component:Forgetpw
    },
    {
      path:'/index',
      name: 'index',
      component: Index,
      children:[
        {
          path:'received',
          component:Received
        },
        {
          path:'find',
          component:Eye  
        },
        {
          path:'my',
          name:'my',
          component:My
        }
      ]
    }
    // ,
    // {
    //   path:'/find',
    //   name:'find',
    //   component:Eye
    // },
    // {
    //   path:'/my',
    //   name:'my',
    //   component:My
    // },
  ]
})
