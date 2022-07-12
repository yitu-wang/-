//我的页面-没登陆的情况下
<template>
  <div class="unlogin">
    <el-empty description="用户未登录">
      <el-button type="primary" @click="myloginFn">登录</el-button>
    </el-empty>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      token: localStorage.getItem('token'),
    }
  },
  methods: {
    ...mapMutations(['loginShowFn']),
    myloginFn() {
      this.loginShowFn(true)
      this.token = localStorage.getItem('token')
    },
  },
  watch: {
    token: {
      handler() {
        if (this.token) {
          this.$router.push('/my')
        }
      },
      immediate: true,
    },
  },
}
</script>

<style lang="less" scoped>
.unlogin {
  width: 1200px;
  margin: 0 auto;
  height: 70vh;
}
</style>