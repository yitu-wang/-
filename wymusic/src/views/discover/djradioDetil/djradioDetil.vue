//电台详情页
<template>
  <div class="container" v-if="flag">
    <div class="left">
      <div class="header">
        <div class="left">
          <img :src="djDetial.picUrl" alt="" />
        </div>
        <div class="right">
          <h3>{{ djDetial.name }}</h3>
          <div class="auther">
            <img :src="djDetial.dj.avatarUrl" alt="" />
            <p>{{ djDetial.dj.nickname }}</p>
          </div>
          <div class="btn">
            <button>
              <i class="el-icon-video-play" @click="playMusicFn"> 播放</i>
            </button>
            <button>
              <i class="el-icon-folder-add"> ({{ djDetial.subCount }})订阅</i>
            </button>
            <button>
              <i class="el-icon-share"></i>
            </button>
          </div>
          <p class="text" v-html="djDetial.rcmdText"></p>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="header">
        <h3>歌曲列表</h3>
      </div>
      <el-table :data="djmusicList" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column label="节目名称" width="200">
          <template slot-scope="scope">
            <div
              class="musicItem"
              @click="
                $router.push({
                  path: '/discover/program',
                  query: {
                    id: scope.row.id,
                  },
                })
              "
            >
              {{ scope.row.name }}
            </div></template
          >
        </el-table-column>
        <el-table-column label="播放次数" width="200">
          <template slot-scope="scope">
            <div class="musicItem">
              {{ scope.row.listenerCount }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i
              class="el-icon-video-play"
              title="播放"
              @click="musicItemPush(scope.$index)"
            ></i>
            <i class="el-icon-share" title="分享"></i>
            <i class="el-icon-download" title="下载"></i>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="20"
        hide-on-single-page
        @current-change="change"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  djdetail1Api,
  djProDeApi,
  musicUrlApi,
  musicDetailApi,
} from '@/request/api.js'
import { mapMutations, mapState } from 'vuex'
import MusicList from '@/components/musicList.vue'

export default {
  name: 'djradioDetil',
  data() {
    return {
      flag: false,
      djDetial: {}, //电台详情
      djmusicList: [], //电台歌曲列表
      total: 0, //总数
    }
  },
  async created() {
    const res = await djdetail1Api({
      rid: this.$route.query.id,
    })
    this.djDetial = res.data.data
    const res1 = await djProDeApi({
      rid: this.$route.query.id,
      limit: 20,
      offset: 0,
    })
    this.djmusicList = res1.data.programs
    this.total = res1.data.count
    console.log(res1.data)
    this.flag = true
  },
  components: {
    MusicList,
  },
  methods: {
    ...mapMutations([
      'musicListFn',
      'musicUrlFn',
      'musicDetailFn',
      'musicItemFn',
      'clearMusicListFn',
    ]),
    //点击播放整个歌单
    async playMusicFn() {},
    musicItemPush(index) {},
    async change(ids) {
      ids = ids - 1
      const res2 = await djProDeApi({
        rid: this.$route.query.id,
        limit: 20,
        offset: ids * 20,
      })
      this.djmusicList = res2.data.programs
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  overflow: hidden;
  width: 1200px;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .left {
    width: 1200px;
    .header {
      padding: 0px 30px;
      overflow: hidden;
      .left {
        margin-left: 50px;
        float: left;
        width: 300px;
        height: 200px;
        margin-top: 30px;
        overflow: hidden;
        img {
          width: 200px;
          height: 200px;
        }
      }
      .right {
        width: 500px;
        display: inline-block;
        float: left;
        margin-left: 10px;
        margin-top: 30px;
        h3 {
          width: 500px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 25px;
        }
        .auther {
          margin-top: 5px;
          img {
            width: 50px;
            height: 50px;
          }
          p {
            display: inline-block;
            font-size: 15px;
            margin-left: 10px;
          }
          span {
            display: inline-block;
            margin-left: 30px;
          }
        }
        .btn {
          margin-top: 10px;
          button {
            padding: 5px 5px;
            align-content: center;
            margin-right: 6px;
            cursor: pointer;
          }
          i {
            font-size: 16px;
            margin-right: 3px;
          }
        }

        .text {
          margin-top: 10px;
          width: 500px;
          border-radius: 5px;
          font-size: 13px;
          color: darkgrey;
          display: -webkit-box;
          /** 对象作为伸缩盒子模型显示 **/
          -webkit-box-orient: vertical;
          /** 设置或检索伸缩盒对象的子元素的排列方式 **/
          -webkit-line-clamp: 4;
          /** 显示的行数 **/
          overflow: hidden;
          /** 隐藏超出的内容 **/
          word-wrap: break-word;
          /*英文强制换行*/
        }
      }
    }
  }
  .center {
    overflow: hidden;
    display: inline-block;
    padding: 0px 30px;
    width: 1200px;
    .header {
      margin-top: 30px;
      border-bottom: 2px solid rgb(187, 106, 106);
      h3 {
        display: inline-block;
        font-size: 25px;
        text-indent: 30px;
      }
      span {
        margin-left: 20px;
        font-size: 15px;
      }
      p {
        float: right;
        margin-top: 12px;
        font-size: 15px;
      }
    }

    i {
      font-size: 18px;
      margin-right: 10px;
      color: silver;
      cursor: pointer;
    }
    i:hover {
      color: black;
    }
    .musicItem:hover {
      cursor: pointer;
      color: black;
      text-decoration: underline;
    }
    .el-pagination {
      margin-top: 20px;
    }
  }
}
</style>