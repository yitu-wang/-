//歌手详情页
<template>
  <div class="box">
    <div class="container">
      <div class="left">
        <div class="header">
          <h2>{{ singerDetail.name }}</h2>
          <span v-if="singerDetail.alias">{{ singerDetail.alias }}</span>
          <div class="img">
            <img :src="singerDetail.cover" alt="" />
            <button v-if="usershow">个人主页</button>
            <button class="like">收藏</button>
          </div>
        </div>
        <div class="con">
          <ul class="nav">
            <li
              :class="{ checkli: checkli == 1 }"
              @click="
                $router.push({ path: '/discover/singer', query: $route.query })
              "
            >
              热门作品
            </li>
            <li
              :class="{ checkli: checkli == 2 }"
              @click="
                $router.push({
                  path: '/discover/singer/album',
                  query: $route.query,
                })
              "
            >
              所有专辑
            </li>
            <li
              :class="{ checkli: checkli == 3 }"
              @click="
                $router.push({
                  path: '/discover/singer/mv',
                  query: $route.query,
                })
              "
            >
              相关Mv
            </li>
            <li
              :class="{ checkli: checkli == 4 }"
              @click="
                $router.push({
                  path: '/discover/singer/desc',
                  query: $route.query,
                })
              "
            >
              艺人介绍
            </li>
          </ul>
          <router-view></router-view>
        </div>
      </div>
      <div class="right">
        <h4>&nbsp&nbsp 热门歌手</h4>
        <ul>
          <li
            v-for="item in sameSinger"
            :key="item.id"
            class="imgLi"
            @click="
              $router.push({
                path: '/discover/singer',
                query: {
                  id: item.id,
                },
              })
            "
          >
            <img :src="item.picUrl" alt="" />
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { singerDetailApi, sameSingerApi } from '@/request/api.js'
export default {
  name: 'artistDetail',
  data() {
    return {
      singerDetail: {}, //歌手详情
      usershow: true, //个人主页显示
      sameSinger: [], //相似歌手
      checkli: 1, //动态class绑定
    }
  },
  methods: {
    //封装整个页面的数据获取方法
    async getData() {
      const res = await singerDetailApi({
        id: this.$route.query.id,
      })

      this.singerDetail = res.data.data.artist
      this.usershow = res.data.data.showPriMsg
      const res1 = await sameSingerApi({
        id: this.$route.query.id,
      })
      this.sameSinger = res1.data.artists.slice(0, 6)
    },
  },
  async created() {
    this.getData()
    let token = localStorage.getItem('token')
  },
  watch: {
    $route: {
      handler(to) {
        this.getData()
        if (to.path === '/discover/singer') {
          this.checkli = 1
        } else if (to.path === '/discover/singer/album') {
          this.checkli = 2
        } else if (to.path === '/discover/singer/mv') {
          this.checkli = 3
        } else if (to.path === '/discover/singer/desc') {
          this.checkli = 4
        }
      },
      immediate: true,
    },
  },
}
</script>

<style lang="less" scoped>
.box {
  background-color: whitesmoke;
}
.container {
  overflow: hidden;
  width: 1200px;
  min-height: 100%;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .left {
    display: inline-block;
    width: 900px;
    overflow: hidden;
    padding: 30px 40px;

    .header {
      overflow: hidden;
      h2 {
        font-size: 25px;
        display: inline-block;
      }
      span {
        margin-left: 20px;
      }
      .img {
        position: relative;
        margin-top: 10px;
        width: 820px;
        height: 300px;
        img {
          width: 100%;
          height: 150%;
          object-position: 0 -50px;
        }
        button {
          position: absolute;
          height: 30px;
          bottom: 10px;
          right: 20px;
          cursor: pointer;
          border: 1px solid black;
          border-radius: 5px;
        }
        button:hover {
          background-color: whitesmoke;
        }
        .like {
          right: 120px;
        }
      }
    }
    .con {
      .nav {
        display: flex;
        justify-content: space-around;
        margin-bottom: 20px;
        background-color: whitesmoke;
        height: 40px;
        line-height: 40px;

        li {
          width: 25%;
          text-align: center;
          font-size: 16px;
          cursor: pointer;
        }
        li:hover {
          border-top: 2px solid salmon;
        }
        .checkli {
          background-color: white;
          border-top: 2px solid salmon;
        }
      }
    }
  }
}

.right {
  overflow: hidden;
  float: right;
  width: 290px;
  margin-top: 30px;
  padding: 10px;
  h4 {
    padding-bottom: 10px;
    font-size: 16px;
    border-bottom: 2px solid whitesmoke;
  }
  ul {
    margin-bottom: 30px;
    padding-left: 0;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .imgLi {
      display: inline-block;
      width: 70px;
      text-align: center;
      margin-top: 15px;
      cursor: pointer;
      img {
        display: inline-block;
        width: 60px;
        height: 60px;
      }
      span {
        width: 60px;
        font-size: 12px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}
</style>