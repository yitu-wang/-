//歌单封面的模板
<template>
  <li>
    <img :src="item.coverImgUrl" />
    <span class="play">
      <i class="el-icon-headset">
        {{
          item.playCount > 10000
            ? `${Math.round(item.playCount / 10000)}万`
            : item.playCount
        }}
      </i>
      <i class="el-icon-video-play" @click.stop="MusicFn(item.id)"></i>
    </span>
    <h5>{{ item.name }}</h5>
  </li>
</template>

<script>
import { discoverMusicApi, musicUrlApi, musicDetailApi } from '@/request/api.js'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'playItem',
  props: {
    item: {},
  },
  methods: {
    ...mapMutations([
      'musicListFn',
      'musicUrlFn',
      'musicDetailFn',
      'musicItemFn',
    ]),
    async MusicFn(id) {
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
}
</script>

<style lang="less" scoped>
li {
  width: 150px;
  height: 220px;
  margin: 13px 30px;
  position: relative;
  img {
    width: 150px;
    height: 150px;
    cursor: pointer;
  }

  .play {
    position: absolute;
    top: 125px;
    left: 0;
    display: inline-block;
    width: 150px;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.6);
    i {
      float: left;
      color: rgb(174, 174, 174);
      margin-left: 10px;
      line-height: 30px;
      cursor: default;
    }

    .el-icon-video-play {
      border: none;
      float: right;
      font-size: 25px;
      width: 20px;
      height: 30px;
      margin-right: 10px;
      cursor: pointer;
    }

    .el-icon-video-play:hover {
      color: white;
    }
  }

  h5 {
    margin-top: 5px;
    width: 150px;
    height: 60px;
    font-size: 14px;
    line-height: 20px;
    overflow: hidden;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    text-align: left;
  }
}
</style>