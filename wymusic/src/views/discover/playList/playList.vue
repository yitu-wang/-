//歌单主页面
<template>
  <div class="container">
    <div class="top">
      <h3>{{ name }}</h3>
      <el-dropdown>
        <el-button size="small" type="primary">
          分类<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu style="margin-left: 20px">
          <li
            v-for="(item, index) in catListPlay.categories"
            :key="index"
            style="margin-left: 10px"
          >
            <h4 style="font-size: 18px; display: inline-block">{{ item }}:</h4>
            <div style="display: inline-block">
              <span
                v-for="item in catListPlay.sub.filter(
                  (item) => item.category == index
                )"
                style="margin: 0 10px; cursor: pointer"
                @click="name = item.name"
                >{{ item.name }}
                <!-- itme.hot是热门 -->
              </span>
            </div>
          </li>
        </el-dropdown-menu>
      </el-dropdown>
      <button class="hot" @click="name = '全部'">全部歌单</button>
    </div>
    <el-skeleton :rows="12" animated v-if="flag" />

    <div class="con">
      <PlayItem
        v-for="item in topPlayList"
        :key="item.id"
        :item="item"
        class="playItem"
        @click.native="
          $router.push({
            path: '/discover/playdetil',
            query: {
              id: item.id,
            },
          })
        "
      ></PlayItem>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="35"
      :current-page="count"
      :total="total"
      @current-change="currentChangeFn"
    >
    </el-pagination>
  </div>
</template>

<script>
import { catListPlayApi, topPlayApi } from '@/request/api.js'
import PlayItem from '@/components/playItem.vue'
export default {
  name: 'playList',
  data() {
    return {
      catListPlay: {}, //分类列表
      topPlayList: [], //歌单列表
      total: 0, //歌单总数
      count: 1, //当前页数
      name: '全部',
      flag: true,
    }
  },
  async created() {
    const res = await catListPlayApi()
    this.catListPlay = res.data
    const res1 = await topPlayApi({
      order: 'hot',
      cat: this.name,
      limit: 35,
    })
    this.topPlayList = res1.data.playlists
    this.total = res1.data.total
    this.flag = false
  },
  methods: {
    //点击页码变换歌单
    async currentChangeFn(val) {
      this.count = val
      const res2 = await topPlayApi({
        order: 'hot',
        cat: this.name,
        limit: 35,
        offset: this.count * 35,
      })
      this.topPlayList = res2.data.playlists
    },
  },
  components: {
    PlayItem,
  },
  watch: {
    name: {
      async handler() {
        //点击不同分类变换列表
        this.count = 1
        const res3 = await topPlayApi({
          order: 'hot',
          cat: this.name,
          limit: 35,
        })
        this.topPlayList = res3.data.playlists
      },
    },
  },
}
</script>

<style lang="less" scoped>
li {
  list-style: none;
  margin-top: 10px;
}
.container {
  width: 1200px;
  min-height: 200px;
  margin: 0 auto;
  padding: 30px 20px;
  .top {
    padding: 10px 0;
    border-bottom: 2px solid salmon;
    h3 {
      float: left;
      font-size: 20px;
      display: inline-block;
      margin-right: 20px;
    }
    .hot {
      float: right;
      width: 80px;
      height: 30px;
      background-color: salmon;
      border: 1px solid whitesmoke;
      border-radius: 5px;
      color: white;
      cursor: pointer;
    }
  }
  .con {
    display: flex;
    flex-wrap: wrap;
    .playItem {
      flex: 1;
      width: 150px;
    }
  }
  .el-pagination {
    text-align: center;
  }
}
</style>