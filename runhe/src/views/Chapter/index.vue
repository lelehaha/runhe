<template>
  <div class="chapter">
    <Add :state="state" :titleData="titleData" @cancel="cancel" @success="success"></Add>   <!-- 新增 -->
    <Edit :state="statee" :eid="edit.id" :ename="edit.name" @cancle="cancel" @success="success"></Edit>
    <header class="chapter_search">
      <el-form :inline="true" ref="form" :model="form" label-width="60px" >
        <el-form-item label="标题">
          <el-select v-model="form.region" placeholder="请选择标题">
            <el-option v-for="item in titleData" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onAdd" class="chapter_add">新增章节</el-button>
        </el-form-item>
      </el-form> 
    </header>
    <el-table
    :data="chapterData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column prop="classify_id" label="标题编号" sortable></el-table-column>
    <el-table-column prop="course_id" label="章节编号" sortable></el-table-column>
    <el-table-column prop="create_time" label="创建日期" sortable></el-table-column> 
    <el-table-column prop="id" label="编号" sortable></el-table-column>
    <el-table-column prop="name" label="名称" sortable></el-table-column>
    <el-table-column prop="update_time" label="更新日期" sortable></el-table-column>
    <el-table-column label="操作">
      <template #default="scope"><!-- 插槽 -->
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"  v-loading.fullscreen.lock="fullscreenLoading">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import Add from './Add.vue';
import Edit from './Edit.vue';
export default {
  components: {
    Add,
    Edit
  },
  data() {
    return {
      edit: {
        id: 0,
        name: '',
      },
      statee: false,
      state: false,
      chapterData: [],
      titleData: [],
      true: true,
      fullscreenLoading: false,
      form: {
        region: '',
      },
    }
  },
  created() {
    // this.rerenderChapterData();
    this.retitleData();
  },
  methods: {
    retitleData() {
      this.$http({
        url: 'api/classify',
      }).then(res => {
        let response = res.data;
        if(response.status == 'success') {
          this.titleData = response.data;
        }else {
          this.$message.error(response.msg)
        }
      })
    },
    rerenderChapterData() {
      this.$http({
      url: `api/chapter?pk=${this.form.region}`,
      }).then(res => {
        let response = res.data;
        if(response.status == 'success') {
          response.data.forEach(item => {
            item.create_time = new Date(item.create_time).toLocaleString();
            item.update_time = new Date(item.update_time).toLocaleString();
          });
          this.chapterData = response.data;
        }else {
          this.$message.error(response.msg);
        }
      });
    },
    onSearch() {
      this.rerenderChapterData();
    },
    onAdd() {
      this.state = true;
    },
    handleEdit(index, row) {
      this.statee = true;
      this.edit.id = row.id;
      this.edit.name = row.name;
    },
    handleDelete(index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.fullscreenLoading = true;
          this.$http({
            url: 'api/chapter',
            method: 'DELETE',
            data: `pk=${row.id.toString()}`,
            headers: {
              'Content-type': 'application/x-www-form-urlencoded'
            }
          }).then(res => {
            this.fullscreenLoading = false;
            let response = res.data;
            if(response.status == 'success') {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.rerenderChapterData();
            }else {
              this.$message.error(response.msg)
            }
          }).catch(error => {
            this.$message.error('连接异常')
          })
        }).catch(() => {
          this.fullscreenLoading = false;
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    cancel() {
      this.state = false;
      this.statee = false;
    },
    success() {
      this.rerenderChapterData();
    }
  }
}
</script>

<style scoped>
.chapter_search {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chapter_search .el-form--inline {
  padding-top: 10px;
}
.chapter_search .el-form--inline .el-form-item {
  margin-bottom: 10px;
}
.chapter_add {
  margin-left: 730px;
}
</style>