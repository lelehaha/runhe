<template>
    <el-menu :default-active="active" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="rgb(48, 65, 86)" text-color="rgb(191, 203, 217)" router>
        <el-menu-item index="/" class="submenu-title-noDropdown">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/title" class="submenu-title-noDropdown">
            <i class="el-icon-tickets"></i>
            <span slot="title">大标题管理</span>
        </el-menu-item>
        <el-menu-item index="/chapter" class="submenu-title-noDropdown">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">章节管理</span>
        </el-menu-item>
        <el-menu-item index="/video" class="submenu-title-noDropdown">
            <i class="el-icon-video-camera"></i>
            <span slot="title">视频管理</span>
        </el-menu-item>
        <el-menu-item index="/model" class="submenu-title-noDropdown">
            <i class="el-icon-coin"></i>
            <span slot="title">模块管理</span>
        </el-menu-item>
        <el-menu-item index="6" class="submenu-title-noDropdown">
            <i class="el-icon-user-solid"></i>
            <span slot="title">会员管理</span>
        </el-menu-item>
        <el-menu-item index="7" class="submenu-title-noDropdown">
            <i class="el-icon-goods"></i>
            <span slot="title">支付宝订单</span>
        </el-menu-item>
        <el-menu-item index="8" class="submenu-title-noDropdown">
            <i class="el-icon-s-goods"></i>
            <span slot="title">微信订单</span>
        </el-menu-item>
        <el-menu-item index="9" class="submenu-title-noDropdown">
            <i class="el-icon-setting"></i>
            <span slot="title">登陆日志</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
  data() {
    return {
        active: '/',
    }
  },
  computed: {
    isCollapse() {
        return this.$store.state.isCollapse;
    }
  },
  created() {
    this.active = this.$route.path;
    // this.$EventBus.$on('changeCollapse', () => {    EventBus方法
    //     this.isCollapse = !this.isCollapse;
    // });
  }
}
</script>

<style>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .submenu-title-noDropdown:hover {
        background-color: #263445!important;
    }
    .submenu-title-noDropdown:focus {
        background-color: #263445!important;
    }
    .el-menu {
        height: inherit;
    }
</style>