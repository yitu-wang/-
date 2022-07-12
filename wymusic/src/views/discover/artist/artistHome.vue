//歌手的默认推荐页面
<template>
  <div class="box1">
    <el-skeleton :rows="12" animated v-if="flag" />
    <ArtistList :hotList="hotList"></ArtistList>
    <ArtistFooter :footerList="footerList"></ArtistFooter>
  </div>
</template>
    </div>
  </div>
</template>




<script>
import { topSingerApi } from '@/request/api.js'
import ArtistList from '@/components/artist/artistList.vue'
import ArtistFooter from '@/components/artist/artistFooter.vue'
export default {
  components: {
    ArtistList,
    ArtistFooter,
  },
  data() {
    return {
      hotList: [], //热门歌手列表
      footerList: [], //底部歌手列表
      flag: true,
    }
  },
  async created() {
    //获取热门歌手
    const res1 = await topSingerApi({ limit: 60 })
    this.hotList = res1.data.artists.slice(0, 10)
    this.footerList = res1.data.artists.slice(10)
    this.flag = false
  },
}
</script>

<style lang="less" scoped>
.box1 {
  /deep/.el-skeleton {
    padding: 60px;
    height: 1040px;
  }
}
</style>