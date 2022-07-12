//底部音乐播放器
<template>
  <div class="box">
    <div class="container">
      <div class="left">
        <i class="el-icon-caret-left" title="上一首" @click="oldMusicFn"></i>
        <i class="el-icon-video-play" v-if="playshow" @click="playFn"></i>
        <i class="el-icon-video-pause" v-else @click="pauseFn"></i>
        <i class="el-icon-caret-right" title="下一首" @click="nextMusicFn"></i>
        <audio
          :src="musicUrl.url"
          ref="audio"
          autoplay
          :loop="loopShow === 1 ? true : false"
          style="display: none"
          @play="playFn"
          @canplay="canplayFn"
          @ended="endedFn"
          @timeupdate="timeupdataFn"
        ></audio>
      </div>
      <div class="con">
        <div class="singerImg">
          <el-avatar
            shape="square"
            :size="50"
            :src="musicDetail.al.picUrl"
            @click.native="pushMusicFn"
          ></el-avatar>
        </div>
        <div class="block">
          <span class="musicName">
            {{ musicDetail.name }}
          </span>
          <i class="el-icon-video-camera" title="mv" v-if="musicDetail.mv"></i>
          <span
            class="singerName"
            v-for="item in musicDetail.ar"
            :key="item.id"
            @click="checkSong(item.id)"
          >
            {{ item.name }}
          </span>
          <el-slider
            v-model="value3"
            :show-tooltip="false"
            @change="sliderChangeFn"
          ></el-slider>
        </div>
        <span class="musicTime">{{ timeupdata }}/{{ totalTime }}</span>
      </div>
      <div class="right">
        <i class="el-icon-folder-add" title="收藏"></i>
        <i class="el-icon-connection" title="分享"></i>
        <el-slider
          v-model="bellValue"
          vertical
          height="80px"
          v-if="bellShow"
          @change="bellChangeFn"
        >
        </el-slider>
        <i class="el-icon-bell" title="音量" @click="bellShow = !bellShow"></i>
        <i
          class="el-icon-refresh"
          title="循环播放"
          v-if="loopShow === 0"
          @click="loopShow = 1"
        ></i>
        <i
          class="el-icon-minus"
          title="单曲循环"
          v-else-if="loopShow === 1"
          @click="loopShow = 2"
        ></i>
        <i
          class="el-icon-more-outline"
          title="随机播放"
          v-else
          @click="loopShow = 0"
        ></i>
        <el-popover placement="top" width="600" trigger="click">
          <ul class="list">
            <li>
              <i
                class="el-icon-delete"
                v-if="musicList.length !== 0"
                @click="clearListFn"
                >清空列表</i
              >
              <p v-else>列表内没有歌曲</p>
            </li>

            <li v-for="(item, index) in musicList" :key="item.id">
              <span @click="checkMusicFn(item.id)">{{ item.name }}</span>
              <span>{{ item.ar[0].name }}</span>
              <span>
                <i
                  class="el-icon-delete"
                  title="删除"
                  @click="deMusicFn(index)"
                >
                  删除这首歌
                </i>
              </span>
            </li>
          </ul>
          <el-button slot="reference">
            <i class="el-icon-set-up" title="列表">
              <span>{{ musicList.length }}</span>
            </i>
          </el-button>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { musicUrlApi, musicDetailApi, musicCanApi } from '@/request/api.js'
export default {
  name: 'musicPlay',
  data() {
    return {
      value3: 0,
      playshow: true,
      totalTime: '00:00',
      timeupdata: '00:00', //播放时长
      bellValue: 100,
      bellShow: false,
      loopShow: 0,
      newIdx: 0, //循环播放的索引
      randomList: [], //随机播放的 索引列表
      randomIdx: 0, //随机播放索引
      singer: {}, //歌曲详细信息
    }
  },
  methods: {
    ...mapMutations([
      'musicUrlFn',
      'musicDetailFn',
      'clearMusicListFn',
      'musicListFn',
      'musicIdxFn',
    ]),
    //点击头像跳转音乐页面
    pushMusicFn() {
      if (this.musicDetail) {
        this.$router.push({
          path: '/discover/music',
          query: {
            id: this.musicDetail.id,
          },
        })
      }
    },
    //格式化事件的方法
    durationTrans(a) {
      var b = ''
      var h = parseInt(a / 3600),
        m = parseInt((a % 3600) / 60),
        s = parseInt((a % 3600) % 60)
      if (h > 0) {
        h = h < 10 ? '0' + h : h
        b += h + ':'
      }
      m = m < 10 ? '0' + m : m
      s = s < 10 ? '0' + s : s
      b += m + ':' + s
      return b
    },
    //定义获取音乐信息与链接的方法
    async musicTotail(id) {
      const res2 = await musicCanApi({ id: id })
      const res = await musicUrlApi({ id: id })
      this.musicUrlFn(res.data.data[0])
      //调取歌曲详细信息
      const res1 = await musicDetailApi({ ids: id })
      this.musicDetailFn(res1.data.songs[0])
    },
    //点击按钮播放
    playFn() {
      if (this.musicUrl.url === '') return
      this.$refs.audio.play() //播放音乐
      this.playshow = false
      this.newIdx = this.musicList.findIndex(
        (item) => item.id === this.musicUrl.id
      )
      this.musicIdxFn(this.newIdx)
    },
    //点击暂停按钮
    pauseFn() {
      this.$refs.audio.pause() //音乐暂停
      this.playshow = true
    },
    //音乐缓存好显示总时长
    canplayFn() {
      //音乐可以播放时
      let times = this.durationTrans(this.$refs.audio.duration)
      this.totalTime = times
      this.singer = this.musicDetail
    },
    //获取音乐播放时长
    timeupdataFn() {
      //动态获取音乐已播放时长
      if (this.$refs.audio !== undefined) {
        let times = this.durationTrans(this.$refs.audio.currentTime)
        this.timeupdata = times
        let count = this.$refs.audio.duration / 100
        this.value3 = this.$refs.audio.currentTime / count
      }
    },
    //点击进度条改变音乐播放时间
    sliderChangeFn() {
      if (this.musicUrl === '') return
      let count = this.$refs.audio.duration / 100
      this.$refs.audio.currentTime = this.value3 * count
      let times = this.durationTrans(this.$refs.audio.currentTime)
      this.timeupdata = times
    },
    //音量调节
    bellChangeFn() {
      this.$refs.audio.volume = this.bellValue / 100
    },
    //歌曲播放结束
    async endedFn() {
      this.playshow = true
      //播放结束如果是单曲循环
      if (this.loopShow === 1) {
        return
      } else {
        this.nextMusicFn()
      }
    },
    //删除列表歌曲
    deMusicFn(index) {
      this.musicList.splice(index, 1)
    },
    //点击列表歌名播放当前歌曲
    async checkMusicFn(id) {
      this.musicTotail(id)
    },
    //点击清空列表
    clearListFn() {
      this.clearMusicListFn()
    },
    //点击下一首
    nextMusicFn() {
      if (this.musicList.length > 1) {
        if (this.loopShow === 2) {
          this.randomIdx += 1
          if (this.randomIdx === this.randomList.length) this.randomIdx = 0
          let randomIdx2 = this.randomList[this.randomIdx]
          this.musicTotail(this.musicList[randomIdx2].id)
        } else {
          if (this.musicIdx === this.musicList.length - 1) {
            this.musicIdxFn(0)
          } else {
            this.musicIdxFn(this.newIdx + 1)
          }
          if (this.loopShow !== 2) {
            this.musicTotail(this.musicList[this.musicIdx].id)
          }
        }
      } else {
        this.$alert('列表内无其他音乐', '', {
          confirmButtonText: '确定',
        })
      }
    },
    //点击上一首
    oldMusicFn() {
      if (this.musicList.length > 1) {
        if (this.loopShow === 2) {
          this.randomIdx += -1
          if (this.randomIdx < 0) this.randomIdx = this.randomList.length - 1
          let randomIdx2 = this.randomList[this.randomIdx]
          this.musicTotail(this.musicList[randomIdx2].id)
        } else {
          if (this.musicIdx === 0) {
            this.musicIdxFn(this.musicList.length - 1)
          } else {
            this.musicIdxFn(this.newIdx - 1)
          }

          this.musicTotail(this.musicList[this.musicIdx].id)
        }
      } else {
        this.$alert('列表内无其他音乐', '', {
          confirmButtonText: '确定',
        })
      }
    },
    //点击歌手名切换到歌手页面
    checkSong(id) {
      if (id) {
        this.$router.push({
          path: '/discover/singer',
          query: {
            id: id,
          },
        })
      }
    },
  },

  computed: {
    ...mapState(['musicUrl', 'musicDetail', 'musicList', 'musicIdx']),
  },
  watch: {
    musicList: {
      handler(newVal) {
        this.randomList.length = 0
        while (this.randomList.length < newVal.length) {
          let count = Math.floor(Math.random() * newVal.length)
          if (this.randomList.indexOf(count) === -1) {
            this.randomList.push(count)
          }
        }
      },
      immediate: true,
    },
  },
}
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 60px;
  background-color: rgba(245, 108, 108, 0.95);
  position: fixed;
  bottom: 0;

  .container {
    width: 1200px;
    height: 60px;
    margin: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .left {
      width: 25%;
      padding: 0 20px;
      i {
        margin: 0 10px;
        font-size: 40px;
        color: rgb(232, 232, 232);
        cursor: pointer;
      }
      i:hover {
        color: white;
      }
      .el-icon-video-play,
      .el-icon-video-pause {
        color: white;
        font-size: 45px;
      }
    }
    .con {
      width: 55%;
      position: relative;
      .singerImg {
        position: absolute;
        top: -25px;
        cursor: pointer;
      }
      span {
        max-width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .block {
        width: 70%;
        position: absolute;
        top: -20px;
        left: 70px;
        color: rgb(255, 255, 255);
        .musicName {
          cursor: pointer;
          margin-right: 5px;
        }
        .el-slider {
          /deep/.el-slider__bar {
            background-color: cornsilk;
          }
          /deep/.el-slider__button {
            border: 2px solid cornsilk;
          }
        }
        .el-icon-video-camera {
          vertical-align: middle;
          font-size: 20px;
          cursor: pointer;
          margin-right: 5px;
        }
        .el-icon-link {
          font-size: 14px;
          line-height: 20px;
          cursor: pointer;
        }
        .singerName {
          margin-right: 10px;
          font-size: 12px;
          line-height: 20px;
          cursor: pointer;
        }
        .singerName:hover {
          border-bottom: 2px solid white;
        }
      }
      .musicTime {
        position: absolute;
        top: 5px;
        right: 40px;
        color: white;
      }
    }
    .right {
      width: 20%;
      padding-left: 20px;
      position: relative;
      i {
        cursor: pointer;
        transition: 0.3s;
        font-size: 22px;
        color: white;
        margin-right: 5px;
        span {
          display: inline-block;
          vertical-align: text-top;
          width: 30px;
          height: 22px;
          border-radius: 0 20px 20px 0;
          text-align: center;
          font-size: 16px;
          line-height: 22px;
          background: rgba(0, 0, 0, 0.2);
        }
      }
      i:nth-child(2) {
        margin-right: 30px;
      }
      i:hover {
        text-shadow: 0px 0px 10px white;
      }
      /deep/.el-button {
        padding: 0;
        margin: 0;
        background-color: rgba(255, 255, 255, 0.2);
      }
      .el-slider {
        position: absolute;
        bottom: 30px;
        left: 90px;
        /deep/.el-slider__bar {
          background-color: cornsilk;
        }
        /deep/.el-slider__button {
          border: 2px solid cornsilk;
        }
      }
    }
  }
}
.list {
  max-height: 500px;
  overflow-y: auto;
  i {
    cursor: pointer;
  }
  li {
    display: flex;
    margin: 2px 5px;

    span {
      flex: 1;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>