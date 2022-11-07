<template>
  <div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      log: []
    }
  },
  created() {
    this.relogs();
  },
  methods: {
    relogs() {
      this.$http({
        url: 'api/supersigninlogs'
      }).then(res => {
        let response = res.data.data;
        response.forEach(item => {
          item.create_time = new Date(item.create_time).toLocaleString();
        })
        this.log = response;
        console.log(this.log)
      }).catch(error => {

      });
    }
  }
}
</script>

<style>

</style>