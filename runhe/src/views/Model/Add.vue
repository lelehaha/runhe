<template>
    <div class="chapterAdd" v-if="state">
      <el-form
        label-position="right"
        label-width="auto"
        :model="formLabelAlign"
        class="chapter_add"
      >
          <el-form-item label="标题">
            <el-select v-model="formLabelAlign.region" placeholder="请选择标题">
              <el-option v-for="item in titleData" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item class="el-form-button">
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button type="primary" @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
          formLabelAlign: {
              region: '',
              name: "",
          },
          rules: {
              
          }
      };
    },
    props: {
      state: {
          type: Boolean,
          dafault() {
              return false;
          }
      },
      titleData: Array
    },
    methods: {
      onSubmit() {
          let formData = new FormData();
          formData.append('classify',this.formLabelAlign.region.toString());
          formData.append('name',this.formLabelAlign.name);
          this.$http({
              url: 'api/course',
              method: 'POST',
              data: formData,
          }).then(res => {
              let response = res.data;
              if(response.status == 'success') {
                  this.onCancel();
                  this.$message({
                      type: 'success',
                      message: response.msg
                  });
                  this.$emit('success');
              }else {
                  this.$message.error(response.msg)
              }
          }).catch(error => {
              this.$message.error('连接异常');
          })
      },
      onCancel() {
          this.formLabelAlign.region = '';
          this.formLabelAlign.name = '';
          this.$emit('cancel');
      }
    }
  };
  </script>
  
  <style scoped>
  .chapterAdd {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }
  .chapter_add {
    width: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 30px;
  }
  .el-form-button {
      margin-bottom: 0;
  }
  </style>