<template>
  <div class="loginview">
    <div class="login-form">
        <h1 class="login-title">系统登陆</h1>
        <el-input v-model="login.username" placeholder="请输入账号" class="login-input" prefix-icon="el-icon-user-solid" clearable></el-input>
        <el-input placeholder="请输入密码" v-model="login.password" show-password class="login-input" prefix-icon="el-icon-lock" clearable></el-input>
        <div class="login-code">
            <el-input v-model="login.text" class="login-input v-input" prefix-icon="el-icon-postcard" placeholder="请输入验证码"></el-input>
            <img :src="imgsrc" class="login-img" @click="changeCode">
        </div>
        <el-button type="primary" class="login-submit" @click="surlogin">登陆</el-button>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            login: {
                username: '',
                password: '',
                text: '',
                uuid: '',
            },
            imgsrc: '',
            time: '',
        }
    },
    created() {
        this.reRender();
        this.intervalRerender();
    },
    methods: {
        reRender() {
            this.login.uuid = this.uuid();
            this.imgsrc = `http://81.68.121.52:8000/api/generateimagecode?uuid=${this.login.uuid}`;
        },
        uuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
        },
        intervalRerender() {
            clearInterval(this.time);
            this.time = setInterval(() => {
                this.reRender();
            }, 1000 * 60);
        },
        changeCode() {
            this.reRender();
            this.intervalRerender();
        },
        surlogin() {
            this.$http({
                method: 'POST',
                url: 'api/supersignin',
                data: `username=${this.login.username}&password=${this.login.password}&uuid=${this.login.uuid}&text=${this.login.text}`
            }).then(res => {
                if(res.data.status === 'error'){
                    this.$message.error(res.data.msg);
                }else{
                    let date = new Date();
                    date.setHours(date.getHours() + 10);
                    this.$cookie.set('rh_id', res.data.token, { expires: date });  //将用户的token存储到cookie中
                    this.$store.commit('saveToken',res.data.token);            //将用户token存储到VueX中
                    this.$message({
                    message: `${res.data.username}-${res.data.msg}`,
                    type: 'success'
                    });
                    this.$router.push('/');   //登陆成功跳转
                }
            }).catch(error => {
                this.$message.error('登陆异常,请稍后重试');   //接口出问题了(原因服务器宕dang机了)
            });
            this.login.username = '';
                this.login.password = '';
                this.login.text = '';
                this.reRender();
                this.intervalRerender();
        }
    }
}
</script>

<style>
    .login-input input:focus {                       /* 调节input框样式*/
        border: 1px solid hsla(0,0%,100%,.1);
    }
    .login-input input {
        color: #fff;
        border: 1px solid hsla(0,0%,100%,.1);
        background-color: transparent;
    }
</style>

<style scoped>
    .loginview {
        height: inherit;          /* 继承高度 */
        background-color: #2d3a4b;
    }
    .login-form {
        margin: 0 auto;
        width: 450px;
        height: 200px;
        padding: 160px 35px  0 35px;
    }
    .login-title {
        font-size: 26px;
        color: #eee;
        margin: 0 auto 40px auto;
        text-align: center;
        font-weight: 700;
    }
    .login-input {
        margin-bottom: 30px;
    }
    .login-submit {
        width: 100%;
    }
    .login-code {
        display: flex;
        justify-content: space-between;
    }
    .v-input {
        width: 50%;
    }
    .login-img {
        height: 40px;
        cursor: pointer;
    }
</style>