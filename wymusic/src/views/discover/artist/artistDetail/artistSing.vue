//歌手详情页单曲界面
<template>
  <div class="sing">
    <div class="btn">
      <button @click="musictolPlayFn">
        <i class="el-icon-video-play"></i>播放
      </button>
      <button class="add" @click="musicPushFn">+</button>
      <button>收藏热门</button>
    </div>
    <ul>
      <li v-for="(item, index) in musicList" :key="item.id">
        <span class="idx">{{ index + 1 }}</span>
        <i class="el-icon-video-play" @click="playItem(item.id)"> </i>
        <h5>
          {{ item.name }}
        </h5>
        <span class="time">
          <i class="el-icon-video-camera-solid" v-if="item.mv"></i>
        </span>
        <span class="album"
          >{{ item.al.name }}
          <!-- item.al.id是专辑id -->
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { singerMusicApi, musicUrlApi, musicDetailApi } from '@/request/api.js'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'artistSing',
  data() {
    return {
      musicList: [], //单曲列表
    }
  },
  async created() {
    const res = await singerMusicApi({
      id: this.$route.query.id,
    })
    this.musicList = res.data.hotSongs
  },
  methods: {
    ...mapMutations([
      'musicUrlFn',
      'musicDetailFn',
      'musicItemFn',
      'clearMusicListFn',
      'musicListFn',
    ]),
    async musictolPlayFn() {
      this.clearMusicListFn()
      this.musicListFn(this.musicList)
      let id = this.musicList[0].id
      const res = await musicUrlApi({ id: id })
      this.musicUrlFn(res.data.data[0])
      //调取歌曲详细信息
      const res1 = await musicDetailApi({ ids: id })
      this.musicDetailFn(res1.data.songs[0])
      this.musicItemFn(res1.data.songs[0])
    },
    musicPushFn() {
      this.musicList.forEach((item) => {
        this.musicItemFn(item)
      })
    },
    async playItem(id) {
      const res = await musicUrlApi({ id: id })
      this.musicUrlFn(res.data.data[0])
      //调取歌曲详细信息
      const res1 = await musicDetailApi({ ids: id })
      this.musicDetailFn(res1.data.songs[0])
      this.musicItemFn(res1.data.songs[0])
    },
  },
  watch: {
    async $route() {
      const res = await singerMusicApi({
        id: this.$route.query.id,
      })
      this.musicList = res.data.hotSongs
    },
  },
}
</script>

<style lang="less" scoped>
.btn {
  button {
    height: 30px;
    background-color: skyblue;
    border: 1px solid whitesmoke;
    cursor: pointer;
    color: white;
    border-radius: 3px;
    letter-spacing: 1px;
    margin-right: 20px;
  }
  .add {
    margin-left: -21px;
    vertical-align: top;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  button:hover {
    background-image: linear-gradient(rgb(155, 227, 255), skyblue);
  }
}
ul {
  margin-top: 30px;
  padding: 0 10px;
  li {
    padding: 0 10px;
    line-height: 35px;
    height: 35px;

    .idx {
      display: inline-block;
      color: rgb(110, 110, 110);
      width: 50px;
      font-size: 15px;
      vertical-align: top;
    }
    i {
      display: inline-block;
      color: rgb(159, 159, 159);
      font-size: 20px;
      height: 20px;
      line-height: 35px;
      width: 20x;
      margin-right: 60px;
      cursor: pointer;
      vertical-align: top;
    }
    i:hover {
      color: black;
    }
    h5 {
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      font-size: 14px;
      width: 200px;
      cursor: pointer;
    }
    h5:hover {
      text-decoration-line: underline;
    }

    .album {
      float: right;
      width: 250px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .album:hover {
      cursor: pointer;
      text-decoration-line: underline;
    }
  }
  li:nth-child(odd) {
    background-color: whitesmoke;
  }
}
</style>