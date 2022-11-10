<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column prop="vip" label="开通项目"></el-table-column>
      <el-table-column prop="total_amount" label="价格"></el-table-column>
      <el-table-column prop="pay_state" label="付款状态"></el-table-column>
      <el-table-column prop="qs_trade_no" label="订单号"></el-table-column>
      <el-table-column prop="create_time" label="创建日期"></el-table-column>
      <el-table-column prop="update_time" label="更新日期"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      page: '1',
      count: '',
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
          res.data.data.forEach(item => {
            item.create_time = new Date(item.create_time).toLocaleString();
            item.update_time = new Date(item.update_time).toLocaleString();
          });
          this.tableData = res.data.data;
          this.count = res.data.count;
          console.log(this.tableData,this.count);
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