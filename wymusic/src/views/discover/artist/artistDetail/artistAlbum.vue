//歌手详情页专辑页面
<template>
  <div class="album">
    <div class="item">
      <AlbumItem
        class="albumitem"
        v-for="item in albumData"
        :item="item"
        :key="item.id"
        @click.native="
          $router.push({
            path: '/discover/albumdetail',
            query: {
              id: item.id,
            },
          })
        "
      ></AlbumItem>
    </div>

    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="12"
      :total="total"
      @current-change="change"
    >
    </el-pagination>
  </div>
</template>

<script>
import AlbumItem from '@/components/albumItem.vue'
import { singerAlbumcApi } from '@/request/api.js'
export default {
  data() {
    return {
      albumData: [], //专辑封面列表
      total: 0, //总数
    }
  },
  async created() {
    const res = await singerAlbumcApi({
      id: this.$route.query.id,
      limit: 12,
      offset: 0,
    })
    console.log(res.data)
    this.total = res.data.artist.albumSize
    this.albumData = res.data.hotAlbums
  },
  components: {
    AlbumItem,
  },
  methods: {
    async change(idx) {
      idx = idx - 1
      const res1 = await singerAlbumcApi({
        id: this.$route.query.id,
        limit: 12,
        offset: idx * 12,
      })
      this.albumData = res1.data.hotAlbums
    },
  },
}
</script>

<style lang="less" scoped>
.item {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 10px 30px;
  .albumitem {
    transform: scale(1.05);
    margin: 20px;
  }
}
.el-pagination {
  text-align: center;
  margin-top: 10px;
}
</style>