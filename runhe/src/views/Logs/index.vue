<template>
  <div>
    <el-table
      :data="log"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="用户ID">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="ip"
        label="账号登陆IP">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="登陆日期">
      </el-table-column>
    </el-table>
    <div class="page">
      <div class="block">
        <el-pagination
          :current-page="currentPage"
          layout="prev, pager, next"
          :total="pageTotal"
          @current-change="handelChange">
        </el-pagination>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageTotal: 20,
      currentPage: 1,
      log: []
    }
  },
  created() {
    this.relogs();
  },
  methods: {
    relogs() {
      this.$http({
        url: `api/supersigninlogs?page=${this.currentPage}`
      }).then(res => {
        let response = res.data.data;
        response.forEach(item => {
          item.create_time = new Date(item.create_time).toLocaleString();
        })
        this.log = response;
        // this.log.reverse();
      }).catch(error => {
        this.$message.error('连接异常');
      });
    },
    handelChange(currentPage) {
      this.currentPage = currentPage;
      this.relogs();
    }
  }
}
</script>

<style scoped>
.page {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>