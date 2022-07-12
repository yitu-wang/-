//歌手分类路由页面
<template>
  <div class="box1">
    <ArtistList :hotList="hotList" :navshow="true"> {{ cat }} </ArtistList>
    <ArtistFooter :footerList="footerList"></ArtistFooter>
  </div>
</template>

<script>
import { singerItemApi } from '@/request/api.js'
import ArtistList from '@/components/artist/artistList.vue'
import ArtistFooter from '@/components/artist/artistFooter.vue'
export default {
  components: {
    ArtistList,
    ArtistFooter,
  },
  data() {
    return {
      hotList: [], //歌手列表
      footerList: [], //底部列表
      cat: '',
    }
  },
  async created() {},
  computed: {},
  watch: {
    $route: {
      async handler() {
        const res = await singerItemApi({
          limit: 100,
          initial: this.$route.query.initial,
          type: this.$route.query.type,
          area: this.$route.query.area,
        })
        this.hotList = res.data.artists.slice(0, 10)
        this.footerList = res.data.artists.slice(10)
        const query = JSON.parse(JSON.stringify(this.$route.query))
        let cat1 = ''
        let cat2 = ''
        if (query.type == 1) {
          cat2 = '男歌手'
        } else if (query.type == 2) {
          cat2 = '女歌手'
        } else {
          cat2 = '其他乐队'
        }
        if (query.area == 7) {
          cat1 = '华语'
        } else if (query.area == 96) {
          cat1 = '欧美'
        } else if (query.area == 8) {
          cat1 = '日本'
        } else if (query.area == 16) {
          cat1 = '韩国'
        } else if (query.area == 0) {
          cat1 = '其他'
        }
        this.cat = `${cat1}${cat2}`
      },
      immediate: true,
      deep: true,
    },
  },
}
</script>

<style lang="less" scoped>
.box1 {
  min-height: 100px;
}
</style>px