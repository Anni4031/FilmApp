import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '../views/login/login'
import Register from '../views/login/register'
import Forgetpw from '../views/login/forgetpw'
import Index from '../views/index/index'
import Received from '../views/index/received'
import Eye from '../views/index/eye'
import My from '../views/index/my'
import Moviemsg from '../views/film/moviemsg'
import Searchpage from '../views/search/searchpage'
import SearchResult from '../views/search/searchResult'
import Starmsg from '../views/celebrity/starMsg'

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
    ,
    {
      path:'/moviemsg/:id',
      name:'moviemsg',
      component:Moviemsg
    },
    {
      path:'/searchpage',
      component:Searchpage
    },
    {
      path:"/searchResult",
      name:"searchResult",
      component:SearchResult

    },
    {
      path:'/starmsg/:id',
      name:'starmsg',
      component:Starmsg
    },
    
  ]
})
