import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Category from './views/Category.vue'
import news from './views/News.vue'
import Shopcar from './views/Shopcar.vue'
import Me from './views/Me.vue'

// 新闻详情
import newsInfo from './views/NewsInfo.vue'
// 商品分类
import GoodsList from './views/GoodsList.vue'
// 商品详情
import GoodsInfo from './views/GoodsInfo.vue'

// 个人中心
import myorder from './components/me/myorder.vue'
import addressList from './components/me/addressList.vue'
import pwdReset from './components/me/pwdReset.vue'
import list from './components/me/list.vue'
import login from './components/me/login.vue'
import register from './components/me/register.vue'
import account from './components/me/account.vue'
import addressAdd from './components/me/addressAdd.vue'
import addressEdit from './components/me/addressEdit.vue'
Vue.use(Router)

function checkLogin(next){
  const token  = localStorage.getItem('token');
  if(token){
     next();
  }else{
     next('/me/login')
  }

}

export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/home"
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/news',
      name: 'news',
      component: news,
    },
    {
      path: '/newsInfo/:id',
      name: 'newsInfo',
      component: newsInfo,
    },
    {
      path: '/shopcar',
      name: 'shopcar',
      component: Shopcar,
      beforeEnter: (to, from, next) => {
        checkLogin(next)
      }
    },
    {
      path: '/category',
      name: 'category',
      component: Category,
    },
    {
      path: '/goodsList/:id',
      name: 'goodsList',
      component: GoodsList,
    },
    {
      path: '/goodsInfo/:id',
      name: 'goodsInfo',
      component: GoodsInfo,
    },
    {
      path: '/me',
      component: Me,
      redirect:"/me/list",
      children:[
        {
          path: 'list',
          component: list,
          beforeEnter: (to, from, next) => {
            checkLogin(next)
          }
        },
        {
          path: 'login',
          component: login
        },
        {
          path: 'register',
          component: register,
          beforeEnter: (to, from, next) => {
            checkLogin(next)
          }
        },
        {
          path:'myorder',
          component: myorder,
          beforeEnter: (to, from, next) => {
            checkLogin(next)
          }
        },
        {
          path: 'addressList',
          component: addressList,
          beforeEnter: (to, from, next) => {
            checkLogin(next)
          }
        },
        {
          path: 'pwdReset',
          component: pwdReset,
          beforeEnter: (to, from, next) => {
            checkLogin(next)
          }
        },
        {
          path: 'pwdReset',
          component: pwdReset,
          beforeEnter: (to, from, next) => {
            checkLogin(next)
          }
        },
        {
          path: 'account',
          component: account,
          beforeEnter: (to, from, next) => {
            checkLogin(next)
          }
        },
        {
          path: 'addressAdd',
          component: addressAdd,
          beforeEnter: (to, from, next) => {
            checkLogin(next)
          }
        }, 
        {
          path: 'addressEdit/:id',
          component: addressEdit,
          beforeEnter: (to, from, next) => {
            checkLogin(next)
          }
        }
      ]
    }
  ]
})
