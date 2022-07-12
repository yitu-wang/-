//新碟模板
<template>
  <div class="box">
    <div class="container">
      <div class="left">
        <div class="header">
          <div class="left">
            <span class="msk">
              <img :src="albumData.album.blurPicUrl" alt="" />
            </span>
          </div>
          <div class="right">
            <h3>{{ albumData.album.name }}</h3>
            <div class="auther">
              <p>歌手: {{ albumData.album.artist.name }}</p>
              <p>发行时间: {{ formatDate(albumData.album.publishTime) }}</p>
              <p>发行公司: {{ albumData.album.company }}</p>
            </div>
            <div class="btn">
              <button>
                <i class="el-icon-video-play" @click="playMusicFn"> 播放</i>
              </button>
              <button>
                <i class="el-icon-folder-add">
                  ({{ albumData.album.info.commentCount }})</i
                >
              </button>
              <button>
                <i class="el-icon-share"></i>
              </button>
              <button>
                <i class="el-icon-chat-line-square">
                  ({{ albumComment.total }})</i
                >
              </button>
            </div>
            <p class="text" v-html="albumData.album.description"></p>
          </div>
        </div>
        <MusicList :playListMusic="albumData.songs"> </MusicList>
        <!-- <div class="center">
          <div class="header">
            <h3><slot>歌曲列表</slot></h3>
            <span>{{ albumData.album.trackCount }}首歌</span>
          </div>
          <el-table :data="albumData.songs" stripe style="width: 100%">
            <el-table-column type="index" label="序号" width="100">
            </el-table-column>
            <el-table-column label="歌名" width="200">
              <template slot-scope="scope">
                <div class="musicItem">
                  {{ scope.row.name }}
                </div></template
              >
            </el-table-column>
            <el-table-column label="作者" width="200">
              <template slot-scope="scope"
                ><div class="musicItem" @click="show(scope.$index)">
                  {{ scope.row.ar[0].name }}
                </div></template
              >
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
        </div> -->
        <div class="footer center">
          <div class="header">
            <h3>评论</h3>
            <span>共{{ albumComment.total }}条评论</span>
          </div>
          <div class="userText">
            <img :src="squareUrl" alt="" />
            <textarea name="usertext" cols="30" rows="10"></textarea>
            <button>评论</button>
          </div>
          <div class="footer">
            <h4>最热评论({{ albumComment.hotComments.length }})</h4>
            <ul>
              <li
                v-for="item in albumComment.hotComments"
                :key="item.commentId"
              >
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
            <h4>最新评论({{ albumComment.comments.length }})</h4>
            <ul>
              <li v-for="item in albumComment.comments" :key="item.commentId">
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
        <!-- <h4>&nbsp&nbsp 喜欢这个歌单的人</h4>
        <ul>
          <li v-for="item in albumData.subscribers" :key="" class="imgLi">
            <img src="" alt="" />
          </li>
        </ul> -->
        <h4>&nbsp&nbsp 他/她的其他专辑</h4>
        <ul>
          <li
            v-for="item in otherAlbum"
            :key="item.id"
            @click="
              $router.push({
                path: '/discover/albumdetail',
                query: {
                  id: item.id,
                },
              })
            "
          >
            <img :src="item.picUrl" alt="" />
            <h5>{{ item.name }}</h5>
            <span>{{ item.company }}</span>
            <!-- item.id 是该歌单的id item.creator.userId 是创作者的id -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import MusicList from '@/components/musicList.vue'
import { musicUrlApi, musicDetailApi } from '@/request/api.js'
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  components: {
    MusicList,
  },
  props: {
    albumData: { type: Object, deep: true },
    albumComment: { type: Object, deep: true },
    otherAlbum: {
      type: Array,
      deep: true,
    },
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
      this.musicListFn(this.albumData.songs)
      let id = this.albumData.songs[0].id
      const res = await musicUrlApi({ id: id })
      this.musicUrlFn(res.data.data[0])
      //调取歌曲详细信息
      const res1 = await musicDetailApi({ ids: id })
      this.musicDetailFn(res1.data.songs[0])
      this.musicItemFn(res1.data.songs[0])
    },
    //点击播放单曲或向列表内推入
    async musicItemPush(index) {
      let id = this.albumData.songs[index].id
      const res = await musicUrlApi({ id: id })
      this.musicUrlFn(res.data.data[0])
      //调取歌曲详细信息
      const res1 = await musicDetailApi({ ids: id })
      this.musicDetailFn(res1.data.songs[0])
      this.musicItemFn(res1.data.songs[0])
    },
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
        width: 250px;
        height: 250px;
        margin-top: 30px;

        .msk {
          margin-top: 20px;
          margin-left: 40px;
          img {
            width: 177px;
            height: 177px;
          }
          display: inline-block;
          width: 209px;
          height: 177px;
          background: url('@/assets/coverall.png');
          background-position: 0 -986px;
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