//不同列表下的电台列表
<template>
  <div class="djcat">
    <div class="hot" v-if="hotList.length > 0">
      <div class="nav">
        <h3>优秀新电台</h3>
      </div>
      <ul>
        <li v-for="item in hotList" :key="item.id">
          <img
            :src="item.picUrl"
            alt=""
            @click="
              $router.push({
                path: '/discover/djradiodetil',
                query: {
                  id: item.id,
                },
              })
            "
          />
          <p>{{ item.name }}</p>
          <span>{{ item.rcmdtext }}</span>
        </li>
      </ul>
    </div>
    <div class="hot top">
      <div class="nav">
        <h3>电台排行榜</h3>
      </div>
      <ul v-if="topList.length > 0">
        <li v-for="item in topList" :key="item.id">
          <img
            :src="item.picUrl"
            alt=""
            @click="
              $router.push({
                path: '/discover/djradiodetil',
                query: {
                  id: item.id,
                },
              })
            "
          />
          <div class="right">
            <p class="title">{{ item.name }}</p>
            <span class="author"
              ><i class="el-icon-user"></i> {{ item.dj.nickname }}</span
            >
            <span class="count">{{ item.rcmdtext }}</span>
            <span class="like">订阅次数{{ item.subCount }}次</span>
          </div>
        </li>
      </ul>
      <div class="none" v-else>没有更多数据</div>
      <el-pagination
        :current-page.sync="pages"
        background
        layout="prev, pager, next"
        :page-size="22"
        :total="total"
        hide-on-single-page
        @current-change="change"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { djrecommendApi, djhotradioApi } from '@/request/api.js'
export default {
  name: 'djradiocate',
  data() {
    return {
      hotList: [], //优秀电台列表
      topList: [], //排行榜列表
      total: 0, //总数
      pages: 1, //页数
    }
  },
  async created() {
    const res = await djrecommendApi({
      type: this.$route.query.id,
    })
    this.hotList = res.data.djRadios.slice(0, 5)
    const res1 = await djhotradioApi({
      limit: 22,
      offset: 0,
      cateId: this.$route.query.id,
    })
    this.topList = res1.data.djRadios
    this.total = res1.data.count
  },
  watch: {
    async $route() {
      const res = await djrecommendApi({
        type: this.$route.query.id,
      })
      this.hotList = res.data.djRadios.slice(0, 5)
      const res1 = await djhotradioApi({
        cateId: this.$route.query.id,
        limit: 22,
        offset: 0,
      })
      this.pages = 1
      this.total = res1.data.count
      this.topList = res1.data.djRadios
    },
  },
  methods: {
    async change(idx) {
      this.pages = idx
      idx = idx - 1
      const res1 = await djhotradioApi({
        cateId: this.$route.query.id,
        limit: 22,
        offset: idx * 22,
      })
      this.topList = res1.data.djRadios
    },
  },
}
</script>

<style lang="less" scoped>
.djcat {
  padding: 20px 60px;
  .el-pagination {
    margin-top: 30px;
    margin-left: 300px;
  }
  .hot {
    overflow: hidden;
    .nav {
      h3 {
        font-size: 20px;
      }
      border-bottom: 2px solid salmon;
    }
    ul {
      display: flex;
      margin-top: 20px;
      padding: 0px 10px;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        flex: 20%;
        margin-top: 10px;
        img {
          cursor: pointer;
          width: 150px;
          height: 150px;
        }
        p {
          cursor: pointer;
          width: 150px;
          font-size: 15px;
          margin-top: 5px;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box; //特别显示模式
          -webkit-line-clamp: 2; //行数
          line-clamp: 2;
          -webkit-box-orient: vertical; //盒子中内容竖直排列
        }
        p:hover {
          text-decoration-line: underline;
        }
        span {
          width: 150px;
          font-size: 13px;
          color: darkgray;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box; //特别显示模式
          -webkit-line-clamp: 2; //行数
          line-clamp: 2;
          -webkit-box-orient: vertical; //盒子中内容竖直排列
        }
      }
    }
  }
  .top {
    margin-top: 40px;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      li {
        flex: 40%;
        img {
          float: left;
        }
        .right {
          float: left;
          margin-left: 10px;
          .title {
            font-size: 20px;
            font-weight: 700;
            margin-top: 30px;
          }
          .author {
            margin-top: 15px;
            color: black;
          }
          .count {
            display: inline-block;
            margin-top: 20px;
          }
          .like {
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>