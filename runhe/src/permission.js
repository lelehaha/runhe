import router from '@/router';
import cookie from 'js-cookie';
import store from '@/store';
router.beforeEach(async (to, from, next) => {     //导航前置守卫
    let token = store.state.token;
    if(!token) {
        token = cookie.get('rh_id');
        if(!token) {
            if(to.path == '/login') {
              return  next();
            }else {
              return  next('/login'); 
            }  //cookie里没有token，直接去登陆页
        }
        store.commit('saveToken', token)
    }
    let userProfile;
    if(store.state.user.username) {       //判断VueX中有无个人信息
        userProfile = store.state.user;
    }else {
        try {
            userProfile = await store.dispatch('getUserProfile');    //没有的话去获取个人信息
        }catch(error) {}
    }
    if(!userProfile) {          //检查有无个人信息来判断是否登陆
        if(to.path == '/login') {
            next();
        }else {
            cookie.remove('rh_id')
            next('/login');
        }
    }else {
        if(to.path == '/login') {
            next(from)
        }else {
            next();
        }
    }
});
export default router;