//歌曲列表模板
<template>
  <div class="center">
    <div class="header">
      <h3>歌曲列表</h3>
    </div>
    <el-table :data="playListMusic" stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="100"> </el-table-column>
      <el-table-column label="歌名" width="200">
        <template slot-scope="scope">
          <div
            class="musicItem"
            style="cursor: pointer"
            @click="
              $router.push({
                path: '/discover/music',
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
      <el-table-column label="作者" width="200">
        <template slot-scope="scope">
          <div
            class="musicItem"
            v-if="program"
            @click="
              $router.push({
                path: '/discover/singer',
                query: {
                  id: scope.row.artists[0].id,
                },
              })
            "
          >
            {{ scope.row.artists[0].name }}
          </div>
          <div
            class="musicItem"
            v-else
            @click="
              $router.push({
                path: '/discover/singer',
                query: {
                  id: scope.row.ar[0].id,
                },
              })
            "
          >
            {{ scope.row.ar[0].name }}
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
  </div>
</template>

<script>
import { musicUrlApi, musicDetailApi } from '@/request/api.js'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {}
  },

  props: {
    playListMusic: {
      type: Array,
      deep: true,
    },
    program: {
      type: Boolean,
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
    //点击播放单曲或向列表内推入
    async musicItemPush(index) {
      let id = this.playListMusic[index].id
      const res = await musicUrlApi({ id: id })
      this.musicUrlFn(res.data.data[0])
      //调取歌曲详细信息
      const res1 = await musicDetailApi({ ids: id })
      this.musicDetailFn(res1.data.songs[0])
      this.musicItemFn(res1.data.songs[0])
    },
  },
}
</script>

<style lang="less" scoped>
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
</style>