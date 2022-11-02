<template>
  <div class="video">

  </div>
</template>

<script>
export default {
data() {
  return {

  }
},
created() {
  this.reVideo();
},
methods: {
  reVideo() {
    this.$http({
      url: `api/chapter_video?pk=33`,
      data: `pk=25`
    }).then(res => {
      console.log(res)
    }).catch(error => {
      this.$message('连接异常');
    })
  }
}
}
</script>

<style>

</style>