//默认我的音乐打开页面-歌单列表页
<template>
  <div class="box">
    <div class="container">
      <div class="left">
        <div class="header">
          <div class="left" v-if="flag">
            <img :src="playDetail.coverImgUrl" alt="" />
          </div>
          <div class="right">
            <h3>{{ playDetail.name }}</h3>
            <div class="auther" v-if="flag">
              <img :src="playDetail.creator.avatarUrl" alt="" />
              <p>{{ playDetail.creator.nickname }}</p>
            </div>
            <div class="btn">
              <button>
                <i class="el-icon-video-play" @click="playMusicFn"> 播放</i>
              </button>
              <button>
                <i class="el-icon-folder-add"></i>
              </button>
              <button>
                <i class="el-icon-share"></i>
              </button>
              <button>
                <i class="el-icon-chat-line-square">
                  ({{ playDetail.commentCount }})</i
                >
              </button>
            </div>
            <div class="tip" v-if="playDetail.tags != []">
              <p>标签 :</p>
              <button
                v-for="(item, index) in playDetail.tags"
                :key="index + 'tags'"
              >
                {{ item }}
              </button>
            </div>
            <p
              class="text"
              v-if="flag"
              v-html="playDetail.creator.signature"
            ></p>
          </div>
        </div>
        <MusicList :playListMusic="playListMusic"></MusicList>
        <div class="footer center">
          <div class="header">
            <h3>评论</h3>
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
          <div class="footer" v-if="commentList.hotComments">
            <h4>最热评论({{ commentList.hotComments.length }})</h4>
            <ul>
              <li v-for="item in commentList.hotComments" :key="item.commentId">
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
            <h4>最新评论({{ commentList.comments.length }})</h4>
            <ul>
              <li v-for="item in commentList.comments" :key="item.commentId">
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
  </div>
</template>

<script>
import {
  musicUrlApi,
  musicDetailApi,
  userCommentApi,
  playDetailApi,
  playCommentApi,
  discoverMusicApi,
} from '@/request/api.js'
import { mapMutations, mapState } from 'vuex'
import MusicList from '@/components/musicList.vue'

export default {
  name: 'myPlayList',
  data() {
    return {
      content: '', //评论内容
      playDetail: {}, //歌单详情
      commentList: [], //评论详情
      playListMusic: [], //歌单歌曲列表
      flag: false,
    }
  },
  components: {
    MusicList,
  },
  async created() {
    let id = this.$route.query.id
    const res = await playDetailApi({
      id: id,
    })
    this.playDetail = res.data.playlist
    this.flag = true

    const res1 = await playCommentApi({
      id,
    })
    this.commentList = res1.data
    const res2 = await discoverMusicApi({ id: id })
    this.playListMusic = res2.data.songs
    let str = res.data.playlist.trackIds
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
      this.musicListFn(this.playListMusic)

      let id = this.playListMusic[0].id
      const res = await musicUrlApi({ id: id })
      this.musicUrlFn(res.data.data[0])
      //调取歌曲详细信息
      const res1 = await musicDetailApi({ ids: id })
      this.musicDetailFn(res1.data.songs[0])
      this.musicItemFn(res1.data.songs[0])
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
        if (localStorage.getItem('userid')) {
          this.$notify({
            message: '评论成功',
            type: 'success',
          })
        } else {
          this.$notify.error({
            message: '评论失败',
          })
        }
      }
    },
  },
  computed: {
    ...mapState(['squareUrl']),
  },
  watch: {
    async '$route.query.id'() {
      if (this.$route.query.id) {
        let id = this.$route.query.id
        const res = await playDetailApi({
          id: id,
        })
        this.playDetail = res.data.playlist
        this.flag = true
        const res1 = await playCommentApi({
          id,
        })
        this.commentList = res1.data
        const res2 = await discoverMusicApi({ id })
        this.playListMusic = res2.data.songs
      }
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
  width: 900px;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .left {
    display: inline-block;
    width: 900px;
    overflow: hidden;
    overflow: hidden;

    .header {
      padding: 0px 30px;
      overflow: hidden;
      .left {
        float: left;
        width: 200px;
        height: 200px;
        margin-top: 30px;
        overflow: hidden;
        img {
          width: 200px;
          height: 200px;
        }
      }
      .right {
        float: left;
        width: 560px;
        margin-left: 30px;
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
    .center {
      overflow: hidden;
      padding: 0px 30px;
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
          font-size: 18px;
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
      .imgLi {
        display: inline-block;
      }
      li {
        margin-left: 15px;
        margin-top: 20px;
        position: relative;
        cursor: pointer;
        img {
          width: 50px;
          height: 50px;
        }
        h5 {
          display: inline-block;
          position: absolute;
          max-width: 180px;
          font-size: 15px;
          margin-left: 18px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        span {
          position: absolute;
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