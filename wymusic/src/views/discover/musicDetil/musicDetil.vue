//歌单详情模板
<template>
  <div class="box">
    <div class="container">
      <div class="left">
        <div class="header">
          <div class="left" v-if="musicDetil.al">
            <img :src="musicDetil.al.picUrl" alt="" />
          </div>
          <div class="right" v-if="musicDetil.ar">
            <h3>{{ musicDetil.name }}</h3>
            <div class="auther">
              <p>歌手:{{ musicDetil.ar[0].name }}</p>
              <p>所属专辑:{{ musicDetil.al.name }}</p>
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
                <i class="el-icon-chat-line-square"> ({{ total }})</i>
              </button>
            </div>
            <p
              class="text"
              style="white-space: pre-wrap"
              v-html="musicLyric"
            ></p>
          </div>
        </div>
        <div class="footer center">
          <div class="header">
            <h3>评论</h3>
            <span>共{{ total }}条评论</span>
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
            <h4>最热评论({{ hotcomment.length }})</h4>
            <ul>
              <li v-for="item in hotcomment" :key="item.commentId">
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
            <h4>最新评论</h4>
            <ul>
              <li v-for="item in newcomment" :key="item.commentId">
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
      <div class="right">
        <h4>&nbsp&nbsp 包含这首歌的歌单</h4>
        <ul>
          <li
            v-for="item in sameList"
            :key="item.id"
            @click="
              $router.push({
                path: '/discover/playdetil',
                query: { id: item.id },
              })
            "
          >
            <img :src="item.coverImgUrl" alt="" />
            <h5>{{ item.name }}</h5>
            <span>by:{{ item.creator.nickname }}</span>
          </li>
        </ul>
        <h4>&nbsp&nbsp 相似歌曲</h4>
        <ul>
          <li v-for="item in sameMusic" :key="item.id">
            <img
              :src="item.album.blurPicUrl"
              alt=""
              @click="
                $router.push({
                  path: '/discover/music',
                  query: { id: item.id },
                })
              "
            />
            <h5>{{ item.name }}</h5>
            <span>播放<i class="el-icon-caret-right"></i></span>
            <!-- item.id 是该歌单的id item.creator.userId 是创作者的id -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {
  musicUrlApi,
  musicDetailApi,
  musicLyricApi,
  musicCommentApi,
  musicSameListApi,
  musicSameApi,
  userCommentApi,
} from '@/request/api.js'
import { mapMutations, mapState } from 'vuex'
import MusicList from '@/components/musicList.vue'

export default {
  name: 'musicDetil',
  data() {
    return {
      musicLyric: '', //歌词
      musicDetil: {}, //歌曲详情
      hotcomment: [], //热门评论
      newcomment: [], //最新评论
      total: 0, //总数
      sameList: [], //相似歌单
      sameMusic: [], //相似音乐
      content: '', //评论
    }
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
    async playMusicFn() {
      let id = this.$route.query.id
      const res = await musicUrlApi({ id: id })
      this.musicUrlFn(res.data.data[0])
      //调取歌曲详细信息
      const res1 = await musicDetailApi({ ids: id })
      this.musicDetailFn(res1.data.songs[0])
      this.musicItemFn(res1.data.songs[0])
    },
    //封装获取整个页面的数据方法
    async getData() {
      let id = this.$route.query.id
      const res = await musicDetailApi({ ids: id })
      this.musicDetil = res.data.songs[0]
      const res1 = await musicLyricApi({ id: id })
      let str = res1.data.lrc.lyric.split('\n')
      let newArr = []
      str.forEach((item) => {
        newArr.push(item.slice(11))
      })
      str = newArr.join('\n')
      this.musicLyric = str
      const res2 = await musicCommentApi({ id: id })
      this.hotcomment = res2.data.hotComments
      this.newcomment = res2.data.comments
      this.total = res2.data.total
      const res3 = await musicSameListApi({ id: id })
      this.sameList = res3.data.playlists
      const res4 = await musicSameApi({ id: id })
      this.sameMusic = res4.data.songs
    },
    async addCommentFn() {
      if (this.content != '') {
        let id = this.$route.query.id
        const res9 = await userCommentApi({
          type: 0,
          id: id,
          content: this.content,
        })
        this.content = ''
        const res2 = await musicCommentApi({ id: id })
        this.hotcomment = res2.data.hotComments
        this.newcomment = res2.data.comments
        this.total = res2.data.total
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
  async created() {
    this.getData()
  },
  activated() {
    this.getData()
  },
  computed: {
    ...mapState(['squareUrl']),
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
          color: black;
          line-height: 25px;
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
          font-size: 17px;
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
        img {
          cursor: pointer;
          width: 50px;
          height: 50px;
        }
        h5 {
          cursor: pointer;
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
          i {
            cursor: pointer;
            font-size: 18px;
            vertical-align: bottom;
          }
        }
      }
    }
  }
}
</style>