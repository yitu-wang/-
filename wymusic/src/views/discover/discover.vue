// 推荐主页
<template>
  <div>
    <!-- //二级导航 -->
    <div class="secendNav">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo container"
        mode="horizontal"
      >
        <el-menu-item index="1" @click="$router.push('/')">推荐</el-menu-item>
        <el-menu-item
          index="2"
          @click="
            $router.push({
              path: '/discover/toplist',
              query: {
                id: 19723756,
              },
            })
          "
          >排行榜</el-menu-item
        >
        <el-menu-item
          index="3"
          @click="
            $router.push({
              path: '/discover/playlist',
            })
          "
          >歌单</el-menu-item
        >
        <el-menu-item
          index="4"
          @click="
            $router.push({
              path: '/discover/djradiolist',
            })
          "
          >主播电台</el-menu-item
        >
        <el-menu-item
          index="5"
          @click="
            $router.push({
              path: '/discover/artist',
            })
          "
          >歌手</el-menu-item
        >
        <el-menu-item
          index="6"
          @click="
            $router.push({
              path: '/discover/albumlist',
            })
          "
          >新碟上架</el-menu-item
        >
      </el-menu>
    </div>
    <!-- 这是二级路由的位置 -->
    <keep-alive
      exclude="albumDetil,playDetil,topList,djradiocate,playDetilitem,djradioDetil,artistDetail"
    >
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'discover',
  data() {
    return {
      activeIndex2: '1',
    }
  },
  methods: {
    show() {
      console.log('111')
    },
  },
  computed: {},
  watch: {
    $route: {
      handler(to, from) {
        if (to.path === '/discover') {
          this.activeIndex2 = '1'
        } else if (to.path === '/discover/toplist') {
          this.activeIndex2 = '2'
        } else if (
          to.path === '/discover/playlist' ||
          to.path === '/discover/playdetil'
        ) {
          this.activeIndex2 = '3'
        } else if (
          to.path === '/discover/djradiolist' ||
          to.path === '/discover/program' ||
          to.path === '/discover/djcategory' ||
          to.path === '/discover/djradiolist/djcategory' ||
          to.path === '/discover/djradiodetil'
        ) {
          this.activeIndex2 = '4'
        } else if (
          to.path.substring(10, 12) == 'ar' ||
          to.path === '/discover/singer'
        ) {
          this.activeIndex2 = '5'
        } else if (
          to.path === '/discover/albumdetail' ||
          to.path === '/discover/albumlist'
        ) {
          this.activeIndex2 = '6'
        }
      },
      immediate: true,
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
}

//二级导航
.secendNav {
  background-color: #d34f4f;
  min-width: 1200px;

  .el-menu {
    border: none;
    height: 35px;
    line-height: 35px;
    background-color: transparent;
  }

  .el-menu--horizontal {
    .el-menu-item.is-active {
      border-bottom: none;
      color: white;
      background-color: #bc2539;
    }

    .el-menu-item {
      height: 35px;
      line-height: 35px;
      border: none;
      color: white;
      font-size: 15px;
      border-radius: 50px;
      margin-left: 40px;
      padding: 0 40px;
    }
  }

  .el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
  .el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
  .el-menu--horizontal > .el-submenu .el-submenu__title:hover {
    background-color: #bc2539;
    border-radius: 50px;
  }
}
</style>