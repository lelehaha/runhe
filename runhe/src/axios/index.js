import axios from 'axios';
import store from '@/store'
export const url = 'http://81.68.121.52:8000/';
const http = axios.create({
    baseURL: url,
    timeout: 5000,
})
http.interceptors.request.use(function (config) {     //请求拦截器
    // 在发送请求之前做些什么
    config.headers['authorization'] = `Bearer ${store.state.token}`;
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
  export default http;