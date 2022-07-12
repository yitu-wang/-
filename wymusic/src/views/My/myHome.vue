//我的音乐主页
<template>
  <div class="box">
    <div class="container">
      <div class="right">
        <h4
          @click="$router.push('/my/artist')"
          :class="{ checkh4: $route.path == '/my/artist' }"
        >
          &nbsp&nbsp 我的歌手&nbsp({{ subCount.artistCount }})
        </h4>
        <h4
          @click="$router.push('/my/video')"
          :class="{ checkh4: $route.path == '/my/video' }"
        >
          &nbsp&nbsp 我的视频&nbsp({{ subCount.mvCount }})
        </h4>
        <h4 @click="createdShow = !createdShow">
          <i class="el-icon-caret-right" v-if="createdShow"></i>
          <i class="el-icon-caret-bottom" v-else></i>
          &nbsp&nbsp 创建的歌单&nbsp({{ subCount.createdPlaylistCount }})
        </h4>
        <ul v-show="!createdShow">
          <li
            v-for="item in userCreatd"
            :key="item.id"
            @click="topListUrlFn(item.id)"
            :class="{ checkli: item.id == $route.query.id }"
          >
            <img :src="item.coverImgUrl" alt="" />
            <h5>{{ item.name }}</h5>
            <span>歌曲数目{{ item.trackCount }}</span>
          </li>
          <!-- item.tags 是该歌单的标签 item.description 是歌单的简介 -->
        </ul>
        <h4 @click="subShow = !subShow">
          <i class="el-icon-caret-right" v-if="!subShow"></i>
          <i class="el-icon-caret-bottom" v-else></i>
          &nbsp&nbsp 收藏的歌单&nbsp({{ subCount.subPlaylistCount }})
        </h4>
        <ul v-show="subShow">
          <li
            v-for="item in userSub"
            :key="item.id"
            @click="topListUrlFn(item.id)"
            :class="{ checkli: item.id == $route.query.id }"
          >
            <img :src="item.coverImgUrl" alt="" />
            <h5>{{ item.name }}</h5>
            <span>歌曲数目{{ item.trackCount }}</span>
          </li>
          <!-- item.tags 是该歌单的标签 item.description 是歌单的简介 -->
        </ul>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import {
  userSubCountApi,
  userPlayListApi, //用户歌单
} from '@/request/api.js'
export default {
  name: 'topList',
  data() {
    return {
      userCreatd: [], //用户创建的歌单
      subCount: {}, //用户关注的信息
      userSub: [], //用户收藏的歌单
      totalList: null, //总歌单
      createdShow: false,
      subShow: false,
    }
  },

  async created() {
    let id = localStorage.getItem('userid')
    if (id) {
      const res = await userSubCountApi()
      this.subCount = res.data
      const res1 = await userPlayListApi({
        uid: id,
      })
      this.totalList = res1.data.playlist
      if (this.totalList) {
        const newArr = this.totalList.filter((item) => item.userId == id)
        this.userCreatd = newArr
        const newArr2 = this.totalList.filter((item) => item.userId != id)
        this.userSub = newArr2
        if (this.$route.path == '/my') {
          this.$router.push({
            path: '/my/playlist',
            query: {
              id: this.totalList[0].id,
            },
          })
        }
      }
    } else {
      this.$router.push('/myunlogin')
    }
  },
  methods: {
    topListUrlFn(id) {
      this.$router.push({
        path: '/my/playlist',
        query: {
          id: id,
        },
      })
    },
  },
  watch: {
    $route: {
      handler() {
        if (this.$route.path == '/my') {
          this.$router.push({
            path: '/my/playlist',
            query: {
              id: this.totalList[0].id,
            },
          })
        }
      },
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
    min-height: 98vh;
    padding: 10px 10px 50px;
    background-color: white;
    h4 {
      margin-top: 30px;
      height: 30px;
      padding-bottom: 10px;
      font-size: 15px;
      cursor: pointer;
      line-height: 30px;
    }
    h4:hover {
      background-color: whitesmoke;
    }
    .checkh4 {
      background-color: whitesmoke;
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
      .checkli {
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
.nologin {
  height: 70vh;
}
</style>