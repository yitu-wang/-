//二级导航下推荐页
<template>
  <div class="container">
    <!-- //轮播图 -->
    <div class="banner">
      <el-carousel class="container">
        <el-carousel-item v-for="item in banners" :key="item.id">
          <img :src="item.imageUrl" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- //主页内容 -->
    <div class="playList">
      <!-- 热门推荐 -->
      <el-container class="container">
        <!-- 左侧歌手信息 -->
        <el-aside width="300px">
          <div class="singer">
            <h3>入驻歌手</h3>
            <span @click="$router.push('/discover/artist')">更多>></span>
          </div>
          <ul class="singerList">
            <li
              v-for="item in singerList"
              :key="item.id"
              @click="
                $router.push({
                  path: '/discover/singer',
                  query: { id: item.id },
                })
              "
            >
              <img :src="item.img1v1Url" />
              <h4>{{ item.name }}</h4>
              <span>单曲数量{{ item.musicSize }}</span>
            </li>
          </ul>
        </el-aside>
        <el-container>
          <!-- 热门推荐导航栏 -->
          <el-header>
            <i class="el-icon-headset"> 热门推荐</i>
            <i class="el-icon-plus" @click="$router.push('/discover/playlist')">
              查看更多</i
            >
          </el-header>
          <!-- 热门推荐内容 -->
          <el-main>
            <ul class="hotList">
              <PlayItem
                v-for="item in topPlayList"
                :key="item.id"
                :item="item"
                @click.native="
                  $router.push({
                    path: '/discover/playdetil',
                    query: { id: item.id },
                  })
                "
              ></PlayItem>
            </ul>
          </el-main>
        </el-container>
      </el-container>
      <!-- 新碟上架 -->
      <el-container class="container">
        <!-- 新碟上架导航栏 -->
        <el-header>
          <i class="el-icon-headset"> 新碟上市</i>
          <i class="el-icon-plus"> 更多</i>
        </el-header>
        <!-- 新碟上市内容 -->
        <el-main class="albumList">
          <AlbumItem
            v-for="item in albumList"
            :key="item.id"
            :item="item"
            @click.native="
              $router.push({
                path: '/discover/albumdetail',
                query: {
                  id: item.id,
                },
              })
            "
          ></AlbumItem>
        </el-main>
      </el-container>
      <!-- 排行榜单 -->
      <el-container class="container">
        <!-- 榜单导航栏 -->
        <el-header>
          <i class="el-icon-headset"> 榜单</i>
          <i class="el-icon-plus"> 查看更多</i>
        </el-header>
        <!-- 榜单内容 -->
        <el-main class="topList">
          <div class="top">
            <div class="topNav">
              <span>{{ discover1List.name }}</span>
              <a
                href="javascript:;"
                @click="
                  $router.push({
                    path: '/discover/toplist',
                    query: {
                      id: discover1List.id,
                    },
                  })
                "
              ></a>
              <p>{{ discover1List.name }}</p>
              <i
                class="el-icon-video-play"
                @click="moreMusicFn(discover1List.id)"
              ></i>
              <i class="el-icon-folder-add"></i>
            </div>
            <ul>
              <li
                v-for="(item, index) in discoverMusic1List"
                :key="item.id"
                @click="topMusicFn(item.id)"
              >
                <span>{{ index + 1 }}</span>
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div class="top">
            <div class="topNav">
              <span>{{ discover2List.name }}</span>
              <a
                href="javascript:;"
                @click="
                  $router.push({
                    path: '/discover/toplist',
                    query: {
                      id: discover2List.id,
                    },
                  })
                "
              ></a>
              <p>{{ discover2List.name }}</p>
              <i
                class="el-icon-video-play"
                @click="moreMusicFn(discover2List.id)"
              ></i>
              <i class="el-icon-folder-add"></i>
            </div>
            <ul>
              <li
                v-for="(item, index) in discoverMusic2List"
                :key="item.id"
                @click="topMusicFn(item.id)"
              >
                <span>{{ index + 1 }}</span
                >{{ item.name }}
              </li>
            </ul>
          </div>
          <div class="top">
            <div class="topNav">
              <span>{{ discover3List.name }}</span>
              <a
                href="javascript:;"
                @click="
                  $router.push({
                    path: '/discover/toplist',
                    query: {
                      id: discover3List.id,
                    },
                  })
                "
              ></a>
              <p>{{ discover3List.name }}</p>
              <i
                class="el-icon-video-play"
                @click="moreMusicFn(discover3List.id)"
              ></i>
              <i class="el-icon-folder-add"></i>
            </div>
            <ul>
              <li
                v-for="(item, index) in discoverMusic3List"
                :key="item.id"
                @click="topMusicFn(item.id)"
              >
                <span>{{ index + 1 }}</span
                >{{ item.name }}
              </li>
            </ul>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import AlbumItem from '@/components/albumItem.vue'
import PlayItem from '@/components/playItem.vue'
import {
  singerApi,
  bannerApi,
  newAlbumApi,
  totalDiscoverApi,
  discoverMusicApi,
  musicUrlApi,
  musicDetailApi,
  highqualityApi,
} from '@/request/api.js'
import { mapMutations } from 'vuex'
export default {
  name: 'discover',
  data() {
    return {
      singerList: [], //入驻歌手列表
      topPlayList: [], //热门歌单列表
      banners: [], //轮播图
      albumList: [], //新碟列表
      discover1List: [], //第一个榜单
      discover2List: [], //第二个榜单
      discover3List: [], //第三个榜单
      discoverMusic1List: [], //榜单1内歌曲
      discoverMusic2List: [], //榜单2内歌曲
      discoverMusic3List: [], //榜单3内歌曲
    }
  },
  methods: {
    ...mapMutations([
      'musicUrlFn',
      'musicDetailFn',
      'musicListFn',
      'musicIdxFn',
      'clearMusicListFn',
      'musicItemFn',
      'activeIndex2Fn',
    ]),
    //点击榜单音乐播放
    async topMusicFn(id) {
      //调取歌曲url
      const res = await musicUrlApi({ id: id })
      this.musicUrlFn(res.data.data[0])
      //调取歌曲详细信息
      const res1 = await musicDetailApi({ ids: id })
      this.musicDetailFn(res1.data.songs[0])
      this.musicItemFn(res1.data.songs[0])
    },
    //点击榜单播放按钮推送列表
    async moreMusicFn(id) {
      const res7 = await discoverMusicApi({
        id: id,
      })
      this.musicListFn(res7.data.songs)
      let newId = res7.data.songs[0].id
      const res = await musicUrlApi({ id: newId })
      this.musicUrlFn(res.data.data[0])
      //调取歌曲详细信息
      const res1 = await musicDetailApi({ ids: newId })
      this.musicDetailFn(res1.data.songs[0])
      this.musicItemFn(res1.data.songs[0])
    },
  },
  components: {
    PlayItem,
    AlbumItem,
  },
  async created() {
    //获取歌手
    const res = await singerApi({
      cat: 5001,
      limit: 5,
    })
    this.singerList = res.data.artists
    //获取热门歌单
    const res2 = await highqualityApi({ limit: 8 })
    this.topPlayList = res2.data.playlists
    //获取轮播图
    const res3 = await bannerApi()
    this.banners = res3.data.banners
    //获取新碟上市
    const res4 = await newAlbumApi({ limit: 5 })
    this.albumList = res4.data.weekData.slice(0, 5)
    //获取三个榜单
    const res5 = await totalDiscoverApi()
    this.discover1List = res5.data.list[0]
    this.discover2List = res5.data.list[1]
    this.discover3List = res5.data.list[2]

    //获取歌单里的歌曲
    const res6 = await discoverMusicApi({
      id: this.discover1List.id,
      limit: 10,
    })
    this.discoverMusic1List = res6.data.songs
    const res7 = await discoverMusicApi({
      id: this.discover2List.id,
      limit: 10,
    })
    this.discoverMusic2List = res7.data.songs
    const res8 = await discoverMusicApi({
      id: this.discover3List.id,
      limit: 10,
    })
    this.discoverMusic3List = res8.data.songs
  },
}
</script>

<style lang="less" scoped>
// 中间轮播图
.banner {
  height: 400px;

  /deep/.el-carousel__arrow {
    height: 40px;
    width: 40px;
    color: white;
    font-size: 20px;
    background-color: #d34f4f;
  }
  .el-carousel__item {
    z-index: 0;
    img {
      display: block;
      text-align: center;
      margin-left: 60px;
      width: 1080px;
      height: 400px;
      cursor: pointer;
    }
    h3 {
      color: #475669;
      font-size: 18px;
      opacity: 0.75;
      line-height: 400px;
      margin: 0;
      background-color: #475669;
    }
  }
  /deep/.el-carousel__container {
    position: relative;
    height: 400px;
  }
}

//主页内容
.playList {
  width: 1200px;
  margin: 0 auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .el-header,
  .el-footer {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 60px;
    border-bottom: 2px solid #d34f4f;
  }

  //左侧歌手
  .el-aside {
    background-color: white;
    color: #333;
    text-align: center;

    .singer {
      height: 60px;
      border-bottom: 2px solid #727373;

      h3 {
        margin-top: 28px;
        margin-left: 10px;
        float: left;
        cursor: default;
        font-size: 18px;
      }

      span {
        float: right;
        margin-top: 33px;
        margin-right: 20px;
        cursor: pointer;
      }
    }

    .singerList {
      margin-top: 40px;

      li {
        margin-left: 20px;
        margin-top: 20px;
        width: 260px;
        height: 80px;
        border: 1px solid #cfcfcf;
        background-color: #f7f7f7;
        transition: 0.5s;
        cursor: pointer;

        img {
          width: 80px;
          height: 80px;
          float: left;
        }

        h4 {
          float: left;
          font-size: 18px;
          font-weight: 700;
          margin-left: 20px;
          margin-top: 10px;
        }

        span {
          float: left;
          width: 140px;
          margin-top: 5px;
          text-overflow: ellipsis;
          margin-left: -10px;
          white-space: nowrap;
          overflow: hidden;
          font-size: 10px;
        }
      }

      li:hover {
        background-color: #cecece;
      }
    }
  }

  .el-main {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  //顶部导航
  .el-header {
    i {
      line-height: 80px;
    }

    .el-icon-headset {
      float: left;
      font-size: 20px;
      cursor: default;
    }

    .el-icon-plus {
      float: right;
      font-size: 14px;
      cursor: pointer;
    }
  }

  //热门推荐列表
  .hotList {
    margin-left: 10px;
    margin-bottom: 40px;
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-around;
  }

  //新碟上市
  .albumList {
    margin: 40px 50px 60px;
    padding-left: 65px;
    padding-top: 30px;
    display: flex;
    overflow: hidden;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    background-color: #f5f5f5;
    border: 1px solid #cecece;
  }

  //榜单
  .topList {
    margin: 20px 20px;
    margin-bottom: 60px;
    display: flex;
    justify-content: center;

    .top {
      width: 30%;
      text-align: center;
      position: relative;
      border: 1px solid #cecece;
      background-color: #f5f5f5;

      .topNav {
        span {
          position: absolute;
          left: 20px;
          top: 20px;
          display: block;
          width: 80px;
          height: 80px;
          font-size: 16px;
          line-height: 80px;
          color: white;
          background-image: linear-gradient(
            to bottom left,
            pink,
            rgb(253, 103, 128)
          );
        }

        a {
          position: absolute;
          top: 20px;
          left: 20px;
          width: 80px;
          height: 80px;
          background: url(@/assets/coverall.png) no-repeat;
          background-position: -145px -57px;
        }

        p {
          position: absolute;
          top: 35px;
          left: 120px;
          font-size: 20px;
          line-height: 0px;
        }

        i {
          font-size: 30px;
          margin-right: 30px;
          cursor: pointer;
        }

        .el-icon-folder-add {
          margin-left: -20px;
        }
        button {
          position: absolute;
          right: 0;
          background-color: transparent;
          border: none;
          cursor: pointer;
          font-size: 14px;
          color: #727373;
        }
      }

      ul {
        li {
          width: 100%;
          height: 35px;
          line-height: 35px;
          text-align: left;
          font-size: 18px;
          padding-left: 30px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          cursor: pointer;

          span {
            margin-right: 30px;
          }
          span:last-child {
            margin-right: 20px;
          }
        }
        li:last-child {
          padding-left: 25px;
        }

        li:nth-child(odd) {
          background-color: #cecece;
        }

        li:nth-child(-n + 3) {
          span {
            color: #d34f4f;
          }
        }
        li:hover {
          background-color: rgb(148, 148, 148);
        }
      }
    }

    .top:nth-child(2) {
      .topNav {
        span {
          background-image: linear-gradient(
            to bottom left,
            rgb(130, 228, 255),
            rgb(40, 144, 255)
          );
        }
      }
    }

    .top:last-child {
      .topNav {
        span {
          background-image: linear-gradient(
            to bottom left,
            rgb(73, 220, 73),
            rgb(106, 186, 45)
          );
        }
      }
    }
  }
}
</style>