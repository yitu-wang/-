//歌手mv界面
<template>
  <div class="mv">
    <div class="list">
      <div class="item" v-for="item in mvList" :key="item.id">
        <img :src="item.imgurl" alt="" />
        <span>
          <i class="el-icon-video-play"></i>
        </span>
        <h5>{{ item.name }}</h5>
      </div>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="12"
      :total="total"
      @current-change="change"
    >
    </el-pagination>
  </div>
</template>

<script>
import { singerMvApi, singerDetailApi } from '@/request/api.js'
export default {
  name: 'singerMv',
  data() {
    return {
      mvList: [], //mv列表
      total: 0, //mv总数
    }
  },
  async created() {
    const res = await singerMvApi({
      id: this.$route.query.id,
      limit: 12,
    })
    this.mvList = res.data.mvs
    const res1 = await singerDetailApi({
      id: this.$route.query.id,
    })
    this.total = res1.data.data.videoCount - 24
    console.log(res1.data.data)
  },
  methods: {
    async change(idx) {
      idx = idx - 1
      const res1 = await singerMvApi({
        id: this.$route.query.id,
        limit: 12,
        offset: idx * 12,
      })
      this.mvList = res1.data.mvs
    },
  },
}
</script>

<style lang="less" scoped>
.mv {
  min-width: 100%;

  padding: 20px 20px;
  .list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .item {
    width: 160px;
    height: 180px;
    position: relative;
    text-align: center;

    img {
      width: 160px;
      height: 100px;
    }
    span {
      position: absolute;
      top: 0;
      left: 0;
      width: 160px;
      height: 100px;

      line-height: 100px;
      cursor: pointer;

      i {
        font-size: 25px;
        color: rgb(192, 192, 192);
      }
    }
    span:hover {
      background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5));
      i {
        color: rgb(255, 255, 255);
      }
    }
    h5 {
      margin-top: 10px;
    }
  }

  .el-pagination {
    text-align: center;
  }
}
</style>