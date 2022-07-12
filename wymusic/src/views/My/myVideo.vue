//个人界面-视频界面
<template>
  <div class="video">
    <h3>我的视频</h3>
    <ul>
      <li v-for="item in videoList" :key="item.vid">
        <img :src="item.coverUrl" alt="" />
        <i class="el-icon-video-play"></i>
        <h4>{{ item.title }}</h4>
        <span>{{ item.creator[0].userName }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { userMvApi } from '@/request/api.js'
export default {
  name: 'myVideo',
  data() {
    return {
      videoList: [], //视频列表
      count: 0, //视频数量
    }
  },
  async created() {
    const res = await userMvApi()
    this.count = res.data.count
    this.videoList = res.data.data
  },
}
</script>

<style lang="less" scoped>
.video {
  width: 905px;
  min-height: 100vh;
  margin-left: 5px;
  background-color: white;
  display: inline-block;
  padding: 40px;
  h3 {
    font-size: 22px;
    border-bottom: 2px solid salmon;
    padding-bottom: 2px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      position: relative;
      margin-top: 30px;
      text-align: center;
      img {
        cursor: pointer;
        width: 180px;
        height: 120px;
      }
      i {
        cursor: pointer;
        position: absolute;
        top: 30%;
        left: 45%;
        color: whitesmoke;
        font-size: 30px;
      }
      i:hover {
        color: rgb(158, 158, 158);
      }
      h4 {
        cursor: pointer;
        max-width: 180px;
        font-size: 14px;
        line-height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      h4:hover {
        text-decoration-line: underline;
      }
      span {
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>