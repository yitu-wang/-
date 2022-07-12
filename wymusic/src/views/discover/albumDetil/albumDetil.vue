//新碟详情页
<template>
  <div class="box">
    <AlbumDetilItem
      :otherAlbum="otherAlbum"
      :albumData="albumData"
      :albumComment="albumComment"
      v-if="isShow"
    ></AlbumDetilItem>
  </div>
</template>

<script>
import AlbumDetilItem from '@/components/albumDetil/albumDetilItem.vue'
import {
  albumDetailApi,
  albumCommentApi,
  otherAlbumApi,
} from '@/request/api.js'
export default {
  name: 'albumDetil',
  data() {
    return {
      albumData: {},
      albumComment: [],
      otherAlbum: {},
      isShow: false,
    }
  },
  components: { AlbumDetilItem },
  methods: {
    //封装获取数据的方法
    async getData() {
      const res = await albumDetailApi({
        id: this.$route.query.id,
      })
      this.albumData = res.data
      const res1 = await albumCommentApi({
        id: this.$route.query.id,
      })
      this.albumComment = res1.data
      const res2 = await otherAlbumApi({
        id: res.data.album.artist.id,
        limit: 10,
      })
      this.otherAlbum = res2.data.hotAlbums
    },
  },
  async created() {
    this.getData()
    this.isShow = true
  },
  watch: {
    $route() {
      this.getData()
    },
  },
}
</script>

<style>
</style>