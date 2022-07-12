//入驻歌手路由模块
<template>
  <div class="box1">
    <ArtistList :hotList="hotList"> 入驻歌手 </ArtistList>
  </div>
</template>
 
<script>
import ArtistList from '@/components/artist/artistList.vue'
import { topSingerApi } from '@/request/api.js'
export default {
  components: {
    ArtistList,
  },
  async created() {
    const res = await topSingerApi({
      limit: 25,
      offset: 0,
    })
    this.hotList = res.data.artists
  },
  mounted() {
    window.addEventListener('scroll', this.isReFrech)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.isReFrech)
  },
  data() {
    return {
      hotList: [], //歌手列表
      offset: 0, //偏移量
      isRefreshBool: true,
    }
  },
  methods: {
    isReFrech() {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      //变量windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight
      //变量scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight
      //滚动条到底部的条件
      if (
        scrollTop + windowHeight >= scrollHeight - 200 &&
        this.isRefreshBool
      ) {
        // false防止refresh()加载数据函数多次触发
        this.isRefreshBool = false
        this.refresh()
      }
    },
    async refresh() {
      this.offset += 1
      const res1 = await topSingerApi({
        limit: 25,
        offset: this.offset * 25,
      })
      if (res1.data.artists.length !== 0) {
        this.hotList.push(...res1.data.artists)
        this.isRefreshBool = true
      } else {
        this.isRefreshBool = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
.box1 {
  height: 100vh;
}
</style>