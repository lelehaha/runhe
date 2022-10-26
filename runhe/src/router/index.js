import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Layout = () => import('@/layout/index.vue');    //引入组件，用懒加载
const Login = () => import('@/views/login/index.vue');
const Home = () => import('@/views/Home/index');
const Title = () => import('@/views/Title/index');
const Chapter = () => import('@/views/Chapter/index');
const routes = [
 {
  path: '/',
  component: Layout,
  children: [
    {
      path: '',
      component: Home,
      meta: {
        title: '首页'
      }
    }
  ]
 },
 {
  path: '/title',
  component: Layout,
  children: [
    {
      path: '',
      component: Title,
      meta: {
        title: '大标题管理'
      }
    }
  ]
 },
 {
  path: '/chapter',
  component: Layout,
  children: [
    {
      path: '',
      component: Chapter,
      meta: {
        title: '章节管理'
      }
    }
  ]
 },
 {
  path: '/login',
  component: Login
 }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
