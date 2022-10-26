import VueX from 'vuex';
import Vue from 'vue';
import axios from '@/axios';
import { url } from '@/axios';
Vue.use(VueX);

export default new VueX.Store({
    state: {
        isCollapse: false,
        user: {
            username: '',
            avator: ''
        },
        token: ''
    },
    mutations: {
        saveToken(state, token) {
            state.token = token;
        },
        changeIsCollapse(state) {
            state.isCollapse = !state.isCollapse;
        },
        saveUserProfile(state, playload) {           //将个人信息存储到VueX中的同步函数
            state.user.username = playload.username;
            state.user.avator = playload.avator;
        },
        removeToken(state) {
            state.token = '';
        }
    },
    actions: {
        getUserProfile({ commit }) {
            return new Promise((resolve, reject) => {
                axios({
                    url: 'api/superprofile'
                }).then(res => {
                    if(!res.data.status) {
                        res.data.avator =  `${url}${res.data.avator}`;
                         commit('saveUserProfile', res.data);   //成功拿到用信息，将其存储到VueX中
                         resolve(res.data);
                    }else {
                        reject(res.data);
                    }
                }).catch(error => {
                    reject(error);
                })
            })
        }
    }
})