<template>
  <div>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="id" label="编号"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column prop="gender" :formatter="sex" label="性别"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="avator" label="头像">
        <template slot-scope="scope">
            <el-avatar shape="square" size="small"  :src="url + scope.row.avator"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间"> </el-table-column>
      <el-table-column prop="update_time" label="更新时间"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="{row}">
          <!-- 作用域插槽 -->
          <el-button type="danger" size="small" @click="delManager(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {url} from '@/axios'
export default {
  data() {
    return {
      list: [],
      url
    };
  },
  created() {
    this.remanager();
  },
  methods: {
    remanager() {
      this.$http({
        url: "api/superusers",
      })
        .then((res) => {
          let response = res.data;
          if (response.status == "success") {
            response.data.forEach((item) => {
              item.create_time = new Date(item.create_time).toLocaleString();
              item.update_time = new Date(item.update_time).toLocaleString();
            });
            this.list = response.data;
          } else {
            this.$message.error(response.msg);
          }
        })
        .catch((error) => {
          this.$message.error("连接异常");
        });
    },
    delManager(raw) {
        let id = raw.id.toString();
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: 'api/removesuperuser',
            method: 'DELETE',
            data: `pk=${id}`,
            headers: {
                "Content-type": 'application/x-www-form-urlencoded'
            }
          }).then(res => {
            if(res.data.status == 'success') {
                this.$message({
                type: 'success',
                message: '删除成功!'
            });
            this.remanager();
            }else {
                this.$message.error(res.data.msg);
            }
          }); 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    sex(row, column, cellValue, index) {
        if(cellValue == '1') {
            return '男';
        }else {
            return '女';
        }
    }
  },
};
</script>

<style>
</style>