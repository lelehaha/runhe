<template>
  <div id="home">
    <el-container>
      <el-aside width="auto">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <keep-alive include="Title">      <!-- keep-alive缓存 -->
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { url } from '@/axios';
import Aside from './aside.vue';
import Header from './header.vue';
export default {
  components: {
    Aside,
    Header
  },
  data() {
    return {
      
    }
  },
}
</script>

<style scoped>
  #home {
    height: inherit;
    background-color: #f0f2f5;
  }
</style>
<style>
  .el-container,.el-aside {
    height: inherit;
  }
  .el-header {
    padding: 0;
    background-color: #fff;
  }
</style>