<template>
  <div class="manager_inster">
    <el-form
      :model="form"
      ref="managerInster"
      :rules="rules"
      label-width="auto"
    >
      <el-form-item label="新用户名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker
            placeholder="选择时间"
            v-model="form.date2"
            style="width: 100%"
          ></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validateHeaderName = (rule, value, callback) => {
      if (/\w{6,18}/.test(value)) {
        callback();
      } else {
        callback(new Error("账户名6-18位"));
      }
    };
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        name: [{ validator: validateHeaderName, trigger: "blur" }],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.managerInster.validate((state) => {
        if (state) {
          let formdata = new FormData();
          formdata.append("username", this.form.name);
          this.$http({
            url: "api/createsuperuser",
            method: "POST",
            data: formdata,
          })
            .then((res) => {
              if (res.data.status == "success") {
                this.$alert(`新用户名:${res.data.username}/n新密码:${res.data.password}`, "提示信息", {
                  confirmButtonText: "确定",
                });
                this.form.name = '';
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch((error) => {
              this.$message.error("连接异常");
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style>
.manager_inster {
  background-color: #fff;
  padding: 20px;
  height: 100%;
  box-sizing: border-box; /* 因为加了padding出现下拉条，用它消除 */
}
</style>