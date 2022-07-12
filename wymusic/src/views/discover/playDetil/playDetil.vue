//歌单路由组件
<template>
  <div class="box">
    <PlayDetilItem
      :playListData="playListData"
      :playListMusic="playListMusic"
      :playComment="playComment"
      :relatedPlay="relatedPlay"
      v-if="isShow"
    ></PlayDetilItem>
  </div>
</template>

<script>
import PlayDetilItem from '@/components/playDetil/playDetilItem.vue'
import {
  playDetailApi,
  discoverMusicApi,
  playCommentApi,
  relatedPlayApi,
} from '@/request/api.js'
export default {
  name: 'playDetil',
  components: {
    PlayDetilItem,
  },
  created() {
    this.musicListTotail()
  },

  data() {
    return {
      playListData: {},
      playListMusic: [],
      playComment: {},
      relatedPlay: [],
      isShow: false,
    }
  },
  methods: {
    //获取页面所有信息
    async musicListTotail() {
      //获取歌单详情
      const res = await playDetailApi({ id: this.$route.query.id })
      this.playListData = res.data.playlist
      //获取歌单歌曲
      const res1 = await discoverMusicApi({ id: this.$route.query.id })
      this.playListMusic = res1.data.songs
      //获取歌单评论
      const res2 = await playCommentApi({ id: this.$route.query.id })
      this.playComment = res2.data
      //获取推荐歌单
      const res3 = await relatedPlayApi({ id: this.$route.query.id })
      this.relatedPlay = res3.data.playlists

      this.isShow = true
    },
  },
  watch: {
    $route() {
      this.musicListTotail()
    },
  },
}
</script>

<style lang="less" scoped>
</style>