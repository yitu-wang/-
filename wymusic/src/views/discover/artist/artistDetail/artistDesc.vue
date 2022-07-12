//歌手界面歌手介绍
<template>
  <div class="desc">
    <div class="item first">
      <h4>个人简介</h4>
      <p>{{ desc }}</p>
    </div>
    <div class="item" v-for="(item, index) in descList" :key="index">
      <h4>{{ item.ti }}</h4>
      <p v-html="item.txt"></p>
    </div>
  </div>
</template>

<script>
import { singerDescApi } from '@/request/api.js'
export default {
  name: 'artistDesc',
  data() {
    return {
      desc: '', //歌手描述
      descList: [], //歌手描述列表
    }
  },
  async created() {
    const res = await singerDescApi({
      id: this.$route.query.id,
    })
    this.desc = res.data.briefDesc
    this.descList = res.data.introduction
  },
}
</script>

<style lang="less" scoped>
.desc {
  padding: 10px;
  .item {
    h4 {
      padding-left: 10px;
      font-size: 16px;
      padding-bottom: 2px;
    }
    p {
      padding: 10px 20px;
      text-indent: 2em;
      letter-spacing: 1px;
      font-size: 12px;
      color: rgb(100, 100, 100);
      line-height: 18px;
    }
  }
  .first {
    h4 {
      border-left: 5px solid salmon;
      border-radius: 5px;
    }
  }
}
</style>