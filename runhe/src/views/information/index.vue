<template>
  <div>
    {{s}}
  </div>
</template>

<script>
import store from '@/store';
export default {
    data() {
        return {
            s: store.state
        }
    }
}
</script>

<style>

</style>