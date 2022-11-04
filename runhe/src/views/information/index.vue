<template>
  <div class="information">

    <el-descriptions
      title="垂直带边框列表"
      direction="vertical"
      :column="4"
      border
    >
      <el-descriptions-item label="用户名">1{{user.username}}</el-descriptions-item>
      <el-descriptions-item label="性别">{{user.gender}}</el-descriptions-item>
      <el-descriptions-item label="手机号" :span="2">{{user.phone}}</el-descriptions-item>
      <el-descriptions-item label="头像">
        <el-avatar :src="user.avator"></el-avatar>
      </el-descriptions-item>
      <el-descriptions-item label="邮箱">{{user.email}}
        <span class="bind" v-if="!user.email">绑定邮箱</span>
        <span v-else>修改邮箱</span>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      state: true
    };
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    open() {
        this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },

  }
};
</script>

<style scoped>
.information {
    background-color: #fff;
    padding: 20px;
}
.bind {
  border: none;
  outline-width: 0;
  cursor: pointer;
  color: rgb(127, 127, 221);
}
.bind:hover {
  color: rgb(87, 205, 132);
}
.bind:focus {
  color: rgb(87, 205, 132);
}
</style>