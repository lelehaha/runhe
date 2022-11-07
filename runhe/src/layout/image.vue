<template>
  <!-- <input type='file' @change='a(10,$event)'> 
  a(num,e) {console.log(num,e)}   结果为10和event事件对象-->
  <div>
    <el-upload
      class="avatar-uploader"
      ref="upload"
      action="http://81.68.121.52:8000/api/changesuperavator"
      name="avator"
      :headers="header"
      :auto-upload="false"
      :on-change="change"
      :on-success="success"
      :show-file-list="false"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button @click="submitUpload">确认</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      header: {
        authorization: `Bearer ${this.$store.state.token}`
      }
    };
  },
  created() {
    this.imageUrl = this.$store.state.user.avator;
  },
  methods: {
    change(file) {
      let result = URL.createObjectURL(file.raw);
      this.imageUrl = result;
      console.log(file.raw)
    },
    success() {
      this.$message({
        type: 'success',
        message: '修改头像成功'
      })
    },
    a(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        this.src = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    submitUpload() {
      this.$refs.upload.submit();
    }
  },
};
</script>

<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>