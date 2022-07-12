//我的音乐界面-我的歌手界面
<template>
  <div class="artist">
    <h3>我的歌手</h3>
    <ul>
      <li v-for="item in artistList" :key="item.id">
        <img
          :src="item.picUrl"
          alt=""
          @click="
            $router.push({ path: '/discover/singer', query: { id: item.id } })
          "
        />
        <h4
          @click="
            $router.push({ path: '/discover/singer', query: { id: item.id } })
          "
        >
          {{ item.name }}
        </h4>
        <span>{{ item.albumSize }}个专辑</span>
        <span v-if="item.mvSize">{{ item.mvSize }}个mv</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { userSublistApi } from '@/request/api.js'
export default {
  name: 'myartist',
  data() {
    return {
      artistList: [], //歌手列表
      count: 0, //总数
    }
  },
  async created() {
    const res = await userSublistApi()
    this.count = res.data.count
    this.artistList = res.data.data
  },
}
</script>

<style lang="less" scoped>
.artist {
  width: 905px;
  background-color: white;
  display: inline-block;
  margin-left: 5px;
  padding: 40px;
  h3 {
    font-size: 22px;

    letter-spacing: 2px;
    padding-bottom: 2px;
    border-bottom: 2px solid salmon;
  }

  ul {
    padding-top: 20px;
    li {
      padding: 15px;
      height: 130px;
      border-bottom: 2px solid whitesmoke;
      img {
        float: left;
        width: 100px;
        height: 100px;
        cursor: pointer;
      }
      h4 {
        cursor: pointer;
        font-size: 16px;
        margin-left: 130px;
        margin-top: 10px;
      }
      h4:hover {
        text-decoration-line: underline;
      }
      span {
        display: inline-block;
        margin-left: 30px;
        margin-top: 40px;
        font-size: 13px;
        color: rgb(90, 90, 90);
      }
    }
  }
}
</style>