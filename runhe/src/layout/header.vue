<template>
  <div id="header">
    <div class="left">
        <span :class="className" @click="change"></span>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item >{{bread}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="right">
        <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
                <el-image style="width: 35px; height: 35px" class="avator" :src="user.avator"></el-image>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="information">{{user.username}}</el-dropdown-item>
                <el-dropdown-item @click.native="createAdmin">注册账户</el-dropdown-item>
                <el-dropdown-item command="layout">退出登陆</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            className: {
                'el-icon-s-unfold': false,
                'el-icon-s-fold': true,
                'switch': true
            },
            bread: '',
        }
    },
    computed: {
        isCollapse() {
            return this.$store.state.isCollapse;
        },
        user() {
            return this.$store.state.user;
        }
    },
    created() {
        this.className['el-icon-s-unfold'] = this.isCollapse;
        this.className['el-icon-s-fold'] = !this.isCollapse;
        document.title = this.$route.meta.title;
        this.bread = this.$route.meta.title;
    },
    watch: {
        isCollapse(newValue) {
            this.className['el-icon-s-unfold'] = newValue;
            this.className['el-icon-s-fold'] = !newValue;
        },
        $route(newValue) {
            document.title = newValue.meta.title;
            this.bread = newValue.meta.title;
        }
    },
    methods: {
      change() {
        // this.$EventBus.$emit('changeCollapse');      EventBus方法
        // this.className['el-icon-s-unfold'] = !this.className['el-icon-s-unfold'];
        // this.className['el-icon-s-fold'] = !this.className['el-icon-s-fold'];
        this.$store.commit('changeIsCollapse');
      },
      handleCommand(command) {
        if(command == 'layout') {
            this.$store.commit('removeToken');
            this.$cookie.remove('rh_id');
            this.$router.push('/login');
        }
      },
      information() {
        this.$router.push('/information',() => {}, () => {});
      } ,
      createAdmin() {
        
      }
    }
}
</script>

<style>
    #header .el-dropdown-link {
        padding: 0 10px;
        cursor: pointer;
    }
    #header .el-dropdown-link:hover {
        background: rgba(0,0,0,0.025);
    }
</style>

<style scoped>
    #header {
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .right {
        margin-right: 20px;
    }
    .avator {
        
    }
    .left {
        display: flex;
        align-items: center;
        height: inherit;
    }
    .switch {
        padding: 0 10px;
        font-size: 30px;
        line-height: 60px;
        cursor: pointer;
        transition: all 500ms;
    }
    .switch:hover {
        background: rgba(0,0,0,0.025);
    }
</style>