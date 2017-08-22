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
import smallComment from '../views/comments/smallComment'
import comment from '../views/comments/comment'
import Allmovie from '../views/film/allmovie'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/index/received',
      name:''
      
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
    	path:'/register',
      component:Register,
      name: '注册',
    },
    {
    	path:'/forgetpw',
      name: '忘记密码',
    	component:Forgetpw
    },
    {
      path:'/index',
      name: 'index',
      component: Index,
      children:[
        {
          path:'received',
          name: '热映',
          component:Received
        },
        {
          path:'find',
          name: '找片',
          component:Eye  
        },
        {
          path:'my',
          name:'我的',
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
    {
      path: '/smallComment/:id',
      name: 'smallComment',
      component: smallComment
    },
    {
      path: '/comment/:id',
      name: 'comment',
      component: comment
    },
    {
      path: '/allmovie/:id',
      name: '查看全部',
      component: Allmovie
    },
  ]
})
