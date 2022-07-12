//电台主页面
<template>
  <div class="box">
    <div class="top">
      <el-empty description="登录查看更多" v-if="token == null">
        <button @click="loginShowFn(true)">登录</button>
      </el-empty>
      <div class="catList" v-else>
        <i
          class="el-icon-arrow-left"
          @click="djcatelist1 = djcatelist.slice(0, 11)"
        ></i>
        <ul>
          <li
            v-for="item in djcatelist1"
            :key="item.id"
            :class="{ check: item.id == $route.query.id }"
            @click="
              $router.push({
                path: '/discover/djradiolist/djcategory',
                query: {
                  id: item.id,
                },
              })
            "
          >
            <img :src="item.pic56x56Url" alt="" />
            <span>{{ item.name }}</span>
          </li>
        </ul>
        <i
          class="el-icon-arrow-right"
          @click="djcatelist1 = djcatelist.slice(11)"
        >
        </i>
      </div>
    </div>
    <div class="item" v-if="$route.path === '/discover/djradiolist'">
      <div class="left">
        <div class="nav">
          <h3>推荐节目</h3>
          <span>更多>></span>
        </div>
        <ul>
          <li
            v-for="item in djRecommend"
            :key="item.id"
            @click="
              $router.push({
                path: '/discover/program',
                query: {
                  id: item.id,
                },
              })
            "
          >
            <img :src="item.coverUrl" alt="" />
            <h5>{{ item.name }}</h5>
            <span><i class="el-icon-video-play"></i></span>
            <p>{{ item.dj.brand }}</p>
          </li>
        </ul>
      </div>
      <div class="right">
        <div class="nav">
          <h3>节目排行榜</h3>
          <span>更多>></span>
        </div>
        <ul>
          <li
            v-for="(item, index) in djHourList"
            :key="item.program.id"
            @click="
              $router.push({
                path: '/discover/program',
                query: {
                  id: item.program.id,
                },
              })
            "
          >
            <img :src="item.program.coverUrl" alt="" />
            <h5>{{ item.program.name }}</h5>
            <span @click="musicPlayFn(item.program.id)"
              ><i class="el-icon-video-play"></i
            ></span>
            <p>{{ item.program.dj.brand }}</p>
          </li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import {
  djRecommendApi,
  djcatelistApi,
  djHoursListApi,
  djprogramApi,
} from '@/request/api.js'
export default {
  name: 'djradioList',
  data() {
    return {
      djRecommend: [], //推荐节目
      djHourList: [], //24小时节目榜单
      djcatelist: [], //电台分类
      djcatelist1: [], //使用的电台分类
      viewShow: true,
      token: localStorage.getItem('token'),
    }
  },
  async created() {
    const res = await djRecommendApi()
    this.djRecommend = res.data.programs
    const res1 = await djHoursListApi({ limit: 10 })
    this.djHourList = res1.data.data.list
    if (this.token != null) {
      const res2 = await djcatelistApi()
      this.djcatelist = res2.data.categories
      this.djcatelist1 = res2.data.categories
    }
  },
  methods: {
    ...mapMutations(['loginShowFn']),
  },
  // watch: {
  //   $route() {
  //     this.viewShow = false
  //     this.$nextTick(() => {
  //       this.viewShow = true
  //     })
  //   },
  // },
}
</script>

<style lang="less" scoped>
.box {
  width: 1200px;
  min-height: 200px;
  margin: 0 auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .top {
    button {
      width: 100px;
      height: 30px;
      font-size: 18px;
    }
    .catList {
      .check {
        background-color: whitesmoke;
        border-radius: 10px;
      }
      i {
        width: 40px;
        height: 40px;
        font-size: 18px;
        text-align: center;
        line-height: 40px;
        background: whitesmoke;
        border-radius: 50%;
        cursor: pointer;
      }
      .el-icon-arrow-left {
        float: left;
        margin-top: 30px;
        margin-left: 50px;
      }
      .el-icon-arrow-right {
        float: right;
        margin-top: -75px;
        margin-right: 50px;
      }
      ul {
        padding: 10px 20px;

        width: 1000px;
        display: flex;
        overflow: hidden;
        li {
          cursor: pointer;
          padding: 10px 0;
          margin-right: 10px;
          text-align: center;
          img {
            width: 50px;
            height: 50px;
          }
          span {
            display: block;
            width: 80px;
            font-size: 13px;
            color: rgb(72, 72, 72);
          }
        }
        li:hover {
          background: whitesmoke;
          border-radius: 10px;
        }
      }
    }
  }
  .nav {
    padding: 10px 0;
    border-bottom: 2px solid salmon;
    h3 {
      display: inline-block;
      font-size: 22px;
    }
    span {
      float: right;
      margin-top: 10px;
      margin-right: 5px;
      cursor: pointer;
    }
  }
  .item {
    padding: 10px 80px;
    .left {
      display: inline-block;
      width: 500px;
    }
    .right {
      float: right;
      width: 500px;
    }
    ul {
      padding: 10px 15px;
      li {
        cursor: pointer;
        margin-top: 10px;
        margin-bottom: 10px;
        position: relative;
        overflow: hidden;
        img {
          width: 50px;
          height: 50px;
        }
        h5 {
          position: absolute;
          top: 0;
          left: 60px;
          font-size: 16px;
          max-width: 320px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        span {
          position: absolute;
          left: 400px;
          top: 0px;
          padding: 3px;
          cursor: pointer;
          font-size: 25px;
          color: silver;
        }
        span:hover {
          color: black;
        }
        p {
          position: absolute;
          left: 60px;
          bottom: 0;
          max-width: 200px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      li:nth-child(even) {
        background-color: whitesmoke;
      }
    }
  }
}
</style>