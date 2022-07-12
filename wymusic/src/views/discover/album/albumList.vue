//新碟上架主页
<template>
  <div class="album">
    <div class="hot">
      <h3>热门新碟</h3>
      <el-skeleton :rows="6" animated v-if="flag" />

      <ul>
        <li
          v-for="item in albumHotList"
          :key="item.id"
          @click="
            $router.push({
              path: '/discover/albumdetail',
              query: {
                id: item.id,
              },
            })
          "
        >
          <albumItem :item="item" class="albumItem"></albumItem>
        </li>
      </ul>
    </div>
    <div class="hot">
      <h3>
        全部新碟
        <span
          v-for="(item, index) in catList"
          :key="index"
          :class="{ check: index === idx }"
          @click="checkCatFn(index, item)"
          >{{ item }}</span
        >
      </h3>
      <el-skeleton :rows="7" animated v-if="flag" />

      <ul>
        <li
          v-for="item in tolAlbumList"
          :key="item.id"
          @click="
            $router.push({
              path: '/discover/albumdetail',
              query: {
                id: item.id,
              },
            })
          "
        >
          <albumItem :item="item" class="albumItem"></albumItem>
        </li>
      </ul>
      <el-pagination
        @current-change="changeFn"
        :page-size="20"
        :current-page="pages"
        background
        layout="prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { newAlbumApi, tolAlbumApi } from '@/request/api.js'
import albumItem from '@/components/albumItem.vue'
export default {
  components: {
    albumItem,
  },
  async created() {
    const res = await newAlbumApi({
      limit: 10,
      type: 'hot',
    })
    this.albumHotList = res.data.weekData.slice(0, 10)
    const res1 = await tolAlbumApi({
      limit: 20,
      offset: 0,
    })
    this.tolAlbumList = res1.data.albums
    this.total = res1.data.total
    this.flag = false
  },

  data() {
    return {
      albumHotList: [],
      tolAlbumList: [],
      total: 0,
      offset: 0,
      catList: ['全部', '华语', '欧美', '韩国', '日本'],
      idx: 0,
      area: 'ALL',
      pages: 1, //页数初始值
      flag: true,
    }
  },
  methods: {
    async changeFn(idx) {
      this.pages = idx
      this.offset = idx - 1
      const res2 = await tolAlbumApi({
        limit: 20,
        offset: this.offset * 20,
        area: this.area,
      })
      this.total = res2.data.total
      this.tolAlbumList = res2.data.albums
    },
    async checkCatFn(idx, itm) {
      this.pages = 1
      this.idx = idx
      if (itm == '华语') {
        this.area = 'ZH'
      } else if (itm == '全部') {
        this.area = 'ALL'
      } else if (itm == '欧美') {
        this.area = 'EA'
      } else if (itm == '韩国') {
        this.area = 'KR'
      } else if (itm == '日本') {
        this.area = 'JP'
      }
      const res3 = await tolAlbumApi({
        limit: 20,
        offset: this.offset * 20,
        area: this.area,
      })
      this.total = res3.data.total
      this.tolAlbumList = res3.data.albums
    },
  },
}
</script>

<style lang="less" scoped>
.album {
  width: 1200px;
  min-height: 200px;
  margin: 0 auto;
  padding: 20px 10px;
  /deep/.el-skeleton {
    margin-top: 30px;
  }
  h3 {
    font-size: 22px;
    padding-bottom: 10px;
    border-bottom: 3px solid salmon;
    span {
      font-size: 15px;
      margin-left: 30px;
      cursor: pointer;
      color: silver;
    }
    span:hover {
      color: black;
    }
    .check {
      color: black;
      background-color: rgb(173, 173, 173);
      padding: 3px;
      border-radius: 3px;
    }
  }
  ul {
    padding: 20px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      margin: 30px 20px;
      .albumItem {
        transform: scale(1.2);
      }
    }
  }
  .el-pagination {
    text-align: center;
  }
}
</style>