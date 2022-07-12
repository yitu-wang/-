//排行榜详情模板
<template>
  <div class="container">
    <div class="left">
      <div class="header">
        <div class="left">
          <span class="msk">
            <img :src="topDetilData.coverImgUrl" alt="" />
          </span>
        </div>
        <div class="right">
          <h3>{{ topDetilData.name }}</h3>
          <div class="auther">
            <p>更新时间: {{ formatDate(topDetilData.updateTime) }}</p>
          </div>
          <div class="btn">
            <button>
              <i class="el-icon-video-play" @click="playMusicFn"> 播放</i>
            </button>
            <button>
              <i class="el-icon-folder-add">
                ({{ topDetilData.commentCount }})</i
              >
            </button>
            <button>
              <i class="el-icon-share"> ({{ topDetilData.shareCount }}) </i>
            </button>
            <button>
              <i class="el-icon-chat-line-square">
                ({{ topDetilData.subscribedCount }})</i
              >
            </button>
          </div>
          <p class="text" v-html="topDetilData.description"></p>
        </div>
      </div>
      <MusicList :playListMusic="topListMusic"> </MusicList>
      <div class="footer center">
        <div class="header">
          <h3>评论</h3>
          <span>共{{ topComment.total }}条评论</span>
        </div>
        <div class="userText">
          <img :src="squareUrl" alt="" />
          <textarea
            name="usertext"
            v-model="content"
            cols="30"
            rows="10"
          ></textarea>
          <button @click="addCommentFn">评论</button>
        </div>
        <div class="footer">
          <h4>最新评论</h4>
          <ul>
            <li v-for="item in topComment.comments" :key="item.commentId">
              <img :src="item.user.avatarUrl" alt="" />
              <p class="name">{{ item.user.nickname }}</p>
              <span class="content">{{ item.content }}</span>
              <span class="time">{{ item.timeStr }}</span>
              <div class="fun">
                <i class="el-icon-thumb"></i>
                <span class="back">({{ item.likedCount }}) | 回复</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MusicList from '@/components/musicList.vue'
import {
  totalDiscoverApi,
  discoverMusicApi,
  playDetailApi,
  musicUrlApi,
  musicDetailApi,
  playCommentApi,
  userCommentApi,
} from '@/request/api.js'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'topDetil',
  data() {
    return {
      topDetilData: [],
      topListMusic: [],
      topComment: {},
      content: '', //评论
    }
  },
  props: {
    topListId: {
      type: Number,
      deep: true,
    },
  },
  components: {
    MusicList,
  },
  async created() {
    //获取榜单信息
    const res1 = await playDetailApi({ id: this.$route.query.id })
    this.topDetilData = res1.data.playlist
    //获取榜单音乐
    const res2 = await discoverMusicApi({ id: this.$route.query.id })
    this.topListMusic = res2.data.songs
    //获取榜单评论
    const res3 = await playCommentApi({ id: this.$route.query.id })
    this.topComment = res3.data
  },
  methods: {
    ...mapMutations([
      'musicListFn',
      'musicUrlFn',
      'musicDetailFn',
      'musicItemFn',
      'clearMusicListFn',
    ]),
    formatDate(time) {
      let date = new Date(time)
      let year = date.getFullYear()
      let month = date.getMonth()
      let day = date.getDate()
      let hour = date.getHours()
      let min = date.getMinutes()
      let second = date.getSeconds()
      return year + '-' + month + '-' + day
    },
    //点击播放整个歌单
    async playMusicFn() {
      this.clearMusicListFn()
      this.musicListFn(this.topListMusic)
      let id = this.topListMusic[0].id
      const res = await musicUrlApi({ id: id })
      this.musicUrlFn(res.data.data[0])
      //调取歌曲详细信息
      const res1 = await musicDetailApi({ ids: id })
      this.musicDetailFn(res1.data.songs[0])
    },
    async addCommentFn() {
      if (this.content != '') {
        let id = this.$route.query.id
        const res9 = await userCommentApi({
          type: 2,
          id: id,
          content: this.content,
        })
        this.content = ''
        const res3 = await playCommentApi({ id: id })
        this.topComment = res3.data
        if (localStorage.getItem('userid')) {
          this.$notify({
            message: '评论成功',
            type: 'success',
          })
        } else {
          this.$notify.error({
            message: '评论失败,请先登录',
          })
        }
      }
    },
  },
  computed: {
    ...mapState(['squareUrl']),
  },
}
</script>

<style lang="less" scoped>
.container {
  width: 910px !important;
  display: inline-block;
  background-color: white;
  display: inline-block;
  box-shadow: none !important;
  border: 2px solid whitesmoke;
  .left {
    width: 900px;
    margin-top: 30px;
    .header {
      padding: 0px 30px;
      overflow: hidden;
      .left {
        float: left;
        width: 250px;
        height: 250px;
        margin-top: 30px;

        .msk {
          margin-left: 40px;
          img {
            width: 180px;
            height: 180px;
          }
          display: inline-block;
          width: 200px;
          height: 200px;
          padding: 10px;
          background-color: whitesmoke;
        }
      }
      .right {
        float: left;
        width: 560px;
        margin-left: 30px;
        margin-top: 30px;
        h3 {
          width: 500px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 25px;
        }

        .auther {
          margin-top: 20px;
          p {
            margin-top: 5px;
            font-size: 16px;
          }
        }
        .btn {
          margin-top: 20px;
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
        .tip {
          margin-top: 10px;
          p {
            display: inline-block;
          }
          button {
            margin-left: 10px;
            cursor: pointer;
          }
        }
        .text {
          margin-top: 10px;
          width: 500px;
          border-radius: 5px;
          font-size: 16px;
          color: darkgrey;
          display: -webkit-box;
          /** 对象作为伸缩盒子模型显示 **/
          -webkit-box-orient: vertical;
          /** 设置或检索伸缩盒对象的子元素的排列方式 **/
          -webkit-line-clamp: 5;
          /** 显示的行数 **/
          overflow: hidden;
          /** 隐藏超出的内容 **/
          word-wrap: break-word;
          /*英文强制换行*/
          text-indent: 2em;
        }
      }
    }
    .center {
      padding: 0px 30px;
      .header {
        margin-top: 30px;
        border-bottom: 2px solid rgb(187, 106, 106);
        h3 {
          display: inline-block;
          font-size: 25px;
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
        color: black;
        text-decoration: underline;
      }
    }
    .footer {
      overflow: hidden;
      .userText {
        margin-top: 30px;
        margin-left: 30px;
        img {
          width: 50px;
          height: 50px;
        }
        textarea {
          width: 600px;
          height: 80px;
          margin-left: 20px;
          border: 1px solid black;
          vertical-align: top;
          font-size: 20px;
          border-radius: 10px;
        }
        button {
          margin-left: 20px;
        }
      }
      .footer {
        overflow: hidden;
        margin-top: 50px;
        padding-left: 30px;
        h4 {
          font-size: 16px;
        }
        ul {
          overflow: hidden;
          margin-top: 10px;
          margin-bottom: 50px;
          padding-left: 0 !important;

          li {
            border-bottom: 2px solid whitesmoke;
            box-sizing: border-box;
            padding: 10px 0px;
            overflow: hidden;
            position: relative;
            img {
              display: inline-block;
              width: 50px;
              height: 50px;
            }
            .name {
              cursor: pointer;
              display: inline-block;
              margin-left: 10px;
              vertical-align: top;
              font-size: 15px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
            .name:hover {
              text-decoration: underline;
            }
            .content {
              display: inline-block;
              vertical-align: top;
              margin-left: 30px;
              width: 500px;
              text-indent: 1em;
            }
            .time {
              position: absolute;
              top: 40px;
              left: 65px;
            }
            .fun {
              position: absolute;
              right: 20px;
              bottom: 10px;
            }
          }
        }
      }
    }
  }
}
</style>