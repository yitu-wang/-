//排行榜页面
<template>
  <div class="box">
    <div class="container">
      <div class="right">
        <h4>&nbsp&nbsp 全部榜单</h4>
        <ul>
          <li
            v-for="item in topListItem"
            :key="item.id"
            @click="topListUrlFn(item.id)"
          >
            <img :src="item.coverImgUrl" alt="" />
            <h5>{{ item.name }}</h5>
            <span>{{ item.updateFrequency }}</span>
          </li>
          <!-- item.tags 是该歌单的标签 item.description 是歌单的简介 -->
        </ul>
      </div>
      <TopDetil :key="topListId"></TopDetil>
    </div>
  </div>
</template>

<script>
import TopDetil from '@/components/topDetil/topDetil.vue'
import {
  totalDiscoverApi,
  discoverMusicApi,
  playDetailApi,
} from '@/request/api.js'
export default {
  name: 'topList',
  data() {
    return {
      topListItem: [],
      topListId: 0,
    }
  },
  components: {
    TopDetil,
  },
  async created() {
    //获取所有排行榜
    const res = await totalDiscoverApi()
    this.topListItem = res.data.list
    this.topListId = this.topListItem[0].id
    console.log(this.topListId)
  },
  methods: {
    topListUrlFn(id) {
      this.topListId = id
      this.$router.push({
        path: '/discover/toplist',
        query: {
          id: id,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.box {
  min-width: 1200px;
  background-color: whitesmoke;
}
.container {
  width: 1200px;
  margin: 0 auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .right {
    float: left;
    width: 290px;
    padding: 10px;
    background-color: white;
    h4 {
      margin-top: 30px;
      padding-bottom: 10px;
      font-size: 16px;
      border-bottom: 2px solid whitesmoke;
    }
    ul {
      margin-bottom: 30px;
      padding-left: 0;
      .imgLi {
        display: inline-block;
      }
      li:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border: 2px solid whitesmoke;
        background-color: whitesmoke;
      }
      li {
        margin-left: 15px;
        margin-top: 20px;
        position: relative;
        cursor: pointer;
        img {
          width: 60px;
          height: 60px;
        }
        h5 {
          display: inline-block;
          position: absolute;
          max-width: 180px;
          font-size: 15px;
          margin-left: 10px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        span {
          position: absolute;
          color: rgb(101, 101, 101);
          bottom: 5px;
          margin-left: 10px;
          font-size: 12px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>