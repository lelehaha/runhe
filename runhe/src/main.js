import Vue from 'vue';
import App from './App.vue';
import router from './permission';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css';    //清除默认样式
import axios from '@/axios';
import Cookie from 'js-cookie';
import store from '@/store';

Vue.use(ElementUI);   //第三方框架需要use一下
Vue.prototype.$http = axios;
Vue.prototype.$cookie = Cookie;
Vue.prototype.$EventBus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
