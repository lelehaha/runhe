<template>
   <div class="edit" v-if="state">
    <div class="edit_form">
        <el-form :rules="rules" ref="ruleEdit" label-position="center" label-width="auto" :model="formLabelAlign">
            <el-form-item label="编号" prop="id">
                <el-input v-model="formLabelAlign.id" disabled></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="name">
                <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitEdit('ruleEdit')">确认</el-button>
                <el-button class="edit_form_right_button" @click="cancleEdit('ruleEdit')">取消</el-button>
            </el-form-item>
         </el-form>
    </div>
   </div>
</template>

<script>
export default {
    data() {
        const validateId = (rule, value, callback) => {
            if(value === '') {
                callback(new Error('请输入编号'));
            }else {
                callback();
            }
        };
        const validateName = (rule, value, callback) => {
            if(value === '') {
                callback(new Error('请输入名称'));
            }else {
                callback();
            }
        };
        return {
            formLabelAlign: {
                id: this.eid,
                name: this.ename,
            },
            rules: {
                id: [{ validator: validateId, trigger: 'blur'}],
                name: [{ validator: validateName, trigger: 'blur'}]
            }
        }
    },
    props: {
        state: {
            type: Boolean,
            default() {
                return true;
            }
        },
        eid: Number,
        ename: String
    },
    watch: {
        eid(val) {
            this.formLabelAlign.id = val;    //props赋值给data是异步的，先初始化才把值传递过来
        },
        ename(val) {
            this.formLabelAlign.name = val;
        }
    },
    methods: {
        submitEdit(name) {
            this.$refs[name].validate((state) => {
                if(state) {
                    let id = this.formLabelAlign.id.toString();
                    let name = this.formLabelAlign.name;
                    this.$http({
                        url: 'api/classify',
                        method: 'PUT',
                        data: `pk=${id}&name=${name}`
                    }).then(res => {
                        if(res.data.status == 'success') {
                            this.$message({
                                type: 'success',
                                message: res.data.msg
                            })
                            console.log(typeof id,1,id);
                            this.$emit('cancle');
                            this.$emit('success');
                        }else {
                            this.$message.error(res.data.msg);
                            console.log(typeof id,2,id)
                        }
                    }).catch(error => {
                        this.message.error('接口异常')
                    })
                }else {
                    return false;
                }
            })
            this.$emit('success')
        },
        cancleEdit() {
            this.$emit('cancle');
        }
    }
}
</script>

<style scoped>
.edit_form {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    padding-top: 40px;
}
</style>

<style>
.edit {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 5;
}
.edit .el-form-item__content {
    margin-left: 0 !important;
}
.edit_form_right_button {
    margin-left: 260px !important;
}
</style>