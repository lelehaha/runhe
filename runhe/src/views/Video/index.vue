<template>
  <div class="video">
    <div class="videoSet" v-if="state">
      <div class="videoSet-one">
        <el-form class="title_add" ref="ruleForm"  label-position="center" label-width="auto">
            <el-form-item label="视频名称" > 
                <el-input v-model="videoname"></el-input>
            </el-form-item>
            <el-form-item class="title_form_item_content">
                <el-button type="primary" @click="succe('ruleForm')">确认</el-button>
                <el-button @click="cancle('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="left">
      <el-tree :data="options" :props="defaultProps" @node-click="searchVideo" accordion> </el-tree>
    </div>
    <div class="right">
      <header class="video-add">
      <el-upload action="http://81.68.121.52:8000/api/chapter_video" :headers="header" :on-change="videoad" :show-file-list="false" name="video"
      ref="upload" :data="videoh"
      >
      <div class="video-add">
        <el-button class="videoAdd">新增视频</el-button>
      </div>
      </el-upload>
    </header>
        <el-table :data="video" style="width: 100%">
          <el-table-column
            prop="id"
            label="编号"
            width="auto">
          </el-table-column>
          <el-table-column
            prop="name"
            label="视频名"
            width="auto">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建日期">
          </el-table-column>
          <el-table-column
            prop="update_time"
            label="更新日期">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span
                size="mini" class="work"
                @click="handleEdit(scope.$index, scope.row)">观看</span>
                <span
                size="mini" class="work"
                @click="handleChange(scope.$index, scope.row)">更新</span>
              <span
                size="mini" class="work"
                @click="handleDelete(scope.$index, scope.row)">删除</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="videoplay">
          <div id="videoAll"></div>
        </div>
      </div>
  </div>
</template>

<script>
import dplayer from 'dplayer';
export default {
  data() {
    return {
      row: '',
      videoname: '',
      dataId: '',
      videoh: {},
      file: '',
      options: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      header: {
        authorization: `Bearer ${this.$store.state.token}`
      },
      video: [],
      data: '',
      state: false,
      stat: false
    };
  },
  created() {
    this.retitle();
  },
  methods: {
    retitle() {
      this.$http({
        url: "api/classify",
      })
        .then((res) => {
          let datas = res.data.data;
          let newArr = [];
          datas.forEach(item => {
            newArr.push(
              this.$http({
                url: 'api/chapter',
                params: {
                  pk: item.id
                }
              })
            );
          });
          Promise.all(newArr).then(res => {
            res.forEach((item,index) => {
              let arr = [];
              item.data.data.forEach(itme1 => {
                arr.push({
                  id: itme1.id,
                  label: itme1.name
                })
              });
              this.options.push({
                id: datas[index].id,
                label: datas[index].name,
                children: arr
              })
            })
          })
        });
    },
    searchVideo(data,node) {
      if(!data) {}else {
        this.dataId = data.id;
      }
      this.$http({
        url: `api/chapter_video?pk=${this.dataId}`,
      }).then(res => {
        let response = res.data;
        if(res.status == 'error') {
          this.$message.error(response.msg);
        }
        else {
          response.data.forEach(item => {
            item.create_time = new Date(item.create_time).toLocaleString();
            item.update_time = new Date(item.update_time).toLocaleString();
          })
          this.video = response.data;
        }
      }).catch(error => {
        this.$message.error('连接异常');
      })
    },
    videoad(file) {
      this.file = file.raw.name;
      this.dataId = this.dataId.toString();
      this.videoh['name'] = this.file;
      this.videoh['video_permission'] = '1';
      this.videoh['chapter_id'] = this.dataId;
      let result = URL.createObjectURL(file.raw);
      this.imageUrl = result;
      this.$refs.upload.submit();
      this.searchVideo();
    },
    handleEdit(index,row) {
      const dp = new dplayer({
        container: document.getElementById('videoAll'),
        logo: 'i',
        video: {
          url: 'http://81.68.121.52:9000/api/videoplay?path=' + this.video[index].mp4_url.slice(0,this.video[index].mp4_url.indexOf('.'))
        }
      });
    },
    handleDelete(index,row) {
      console.log(index,row)
      this.$confirm('此操作将永久删除该视频, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: 'api/chapter_video',
            method: 'DELETE',
            data: `pk=${row.id}`,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(res => {
            if(res.data.status == 'error'){
              this.$message.error(res.data.msg);
            }else {
                this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.searchVideo();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    handleChange(index,row) {
      this.row = row;
      this.state = true;
    },
    succe() {
      console.log(this.row)
      this.$http({
        url: 'api/chapter_video',
        method: 'PUT',
        data: `pk=${this.row.id}?name=${this.videoname}?chapter_id=${this.row.chapter_id}`,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
          if(res.data.status == 'error'){
            this.$message.error(res.data.msg);
          }else {
            this.$message({
              type: 'success',
              message: '更新成功'
            });
            this.searchVideo();
            this.cancle();
          }
        }).catch(error => {
          this.$message.error('连接异常')
        })
    },
    cancle() {
      this.state = false;
    }
  },
};
</script>

<style>

</style>

<style scoped>
.video {
  display: flex;
  justify-content: space-between;
}
.left {
  width: 24%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.right {
  width: 73%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.video-add {
  background-color: rgb(153, 161, 170);
}
.videoAdd {
  border-radius: 3px;
}
.work:hover {
  color:aqua;
}
.video .work {
  margin: 0 3px;
}
/* .videoplay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0, .5);
  z-index: 5;
} */
.videoSet {
  position: fixed;
  top:0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0,0,0, .5);
  z-index: 5;
}
.videoSet-one {
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