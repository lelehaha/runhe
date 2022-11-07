<template>
  <div class="information">
    <el-descriptions
      title="个人信息列表"
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
        <span class="information-email" v-if="!user.email">
          <span>邮箱号：</span>
          <el-input v-model="email"></el-input>
          <el-button @click="bind">发送验证码</el-button>
        </span>
        <span class="information-email-change" v-else>修改邮箱</span>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      state: true,
      email: ''
    };
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async bind() {
    try {
      var response = await this.$http({
            url: 'api/superbindemail',
            method: 'POST',
            data: `email=${this.email}`,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
      }catch(error) {
        this.$message.error(error);
      };
      let res = response.data;
      if(res.status == 'error') {
        this.$message.error(res.msg);
      }else {
      try {
        var {value} = await this.$prompt('请输入邮箱验证码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // inputPattern: '',  正则验证
          inputErrorMessage: '验证码格式不正确'
        });
      }catch {
        this.$message({
            type: 'info',
            message: '取消输入'
          });
      }
      let response = await this.$http({
        url: 'api/superbindemail',
        method: 'PUT',
        data: `text=${value}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      let res = response.data;
      if(res.status == 'error') {
        this.$message.error(res.msg);
      }else {
        this.$message({
          type: 'success',
          message: `邮箱${this.email}绑定成功`
        })
      }
      }
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
.information-email {
  display: flex;
}
.information-email span {
line-height: 40px;
}
.information-email .el-input {
  width: 300px;
}
.information-email .el-button {
  width: 110px;
  border-radius: 5px;
}
.information-email-change {
  margin-left: 20px;
  color: rgb(123, 123, 228);
  cursor: pointer;
}
.information-email-change:hover {
  color: rgb(138, 209, 157);
}
</style>