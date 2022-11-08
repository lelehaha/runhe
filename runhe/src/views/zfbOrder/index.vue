<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: {},
      page: 1,
    }
  },
  created() {
    this.reZfb();
  },
  methods: {
    reZfb() {
      this.$http({
        url: `api/alipay_order_query?page=${this.page}`
      }).then(res => {
        if(res.data.status == 'error'){
          this.$message.error(res.data.msg);
        }else {
          this.tableData = res.data.data;
          console.log(this.tableData)
        }
      }).catch(error => {
        this.$message.error('连接异常')
      })
    },
    tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
    },
  }
}
</script>

<style>

</style>