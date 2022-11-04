import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Layout = () => import('@/layout/index.vue');    //引入组件，用懒加载
const Login = () => import('@/views/login/index.vue');   //登陆页
const Home = () => import('@/views/Home/index');       
const Title = () => import('@/views/Title/index');     //大标题
const Chapter = () => import('@/views/Chapter/index');    //章节
const Video = () => import('@/views/Video/index');       //视频
const Model = () => import('@/views/Model/index');      //模块
const Manager = () => import('@/views/Manager/index')   //管理员
const ManagerInster = () => import('@/views/Manager/inster')     //管理员新增
const Information = () => import('@/views/information/index')     //个人信息

const Image = () => import('@/layout/image.vue');   //
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
  path: '/model',
  component: Layout,
  children: [
    {
      path: '',
      component: Model,
      meta: {
        title: '模块管理'
      }
    }
  ]
 },
 {
  path: '/video',
  component: Layout,
  children: [
    {
      path: '',
      component: Video,
      meta: {
        title: '视频管理'
      }
    }
  ]
 },
{
  path: '/image',
  component: Layout,
  children:[
    {
      path: '',
      component: Image,
      meta: {
        title: '头像管理'
      }
    }
  ]
},
{
  path: '/manager',
  component: Layout,
  redirect: '/manager/index',
  children: [
    {
      path: 'index',
      component: Manager,
      meta: {
        title: '管理员信息'
      }
    },
    {
      path: 'inster',
      component: ManagerInster,
      meta: {
        title: '新增管理员'
      }
    }
  ]
},
{
  path: '/information',
  component: Layout,
  children: [
    {
      path: '',
      component: Information,
      meta: {
        title: '个人信息'
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
