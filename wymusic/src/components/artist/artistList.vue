//歌手列表模板
<template>
  <div class="box1">
    <div class="item1">
      <div class="top">
        <h3><slot>推荐歌手</slot></h3>
      </div>
      <div class="nav" v-if="navshow">
        <span
          v-for="(item, index) in nav"
          :key="index"
          :class="{ checkNav: idx === item }"
          @click="navChangeFn(item, index)"
          >{{ item }}</span
        >
      </div>
      <ul>
        <li
          v-for="item in hotList"
          :key="item.id"
          @click="
            $router.push({
              path: '/discover/singer',
              query: {
                id: item.id,
              },
            })
          "
        >
          <img :src="item.img1v1Url" alt="" />
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hotList: {
      type: Array,
      deep: true,
    },
    navshow: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    navChangeFn(item, index) {
      if (item === '其他') {
        item = 0
      } else if (item === '热门') {
        item = -1
      }
      const query = JSON.parse(JSON.stringify(this.$route.query))
      query.initial = item
      this.$router.push({ path: this.$route.path, query })
    },
  },
  data() {
    return {
      nav: [
        '热门',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        '其他',
      ],
      idx: '热门',
    }
  },
  watch: {
    $route: {
      handler() {
        const query = JSON.parse(JSON.stringify(this.$route.query))
        if (query.initial == -1) {
          this.idx = '热门'
        } else if (query.initial == 0) {
          this.idx = '其他'
        } else {
          this.idx = query.initial
        }
      },
      immediate: true,
      deep: true,
    },
  },
}
</script>

<style lang="less" scoped>
.box1 {
  width: 950px;
  padding-top: 60px;
  padding-left: 30px;
  padding-right: 30px;
  .item1 {
    overflow: hidden;
    .top {
      position: relative;
      padding-bottom: 10px;
      border-bottom: 2px solid salmon;
      h3 {
        display: inline-block;
        font-size: 22px;
      }
      span {
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
      }
      span:hover {
        border-bottom: 1px solid rgb(79, 77, 77);
      }
    }
    .nav {
      padding-top: 10px;
      display: flex;
      justify-content: space-between;
      span {
        cursor: pointer;
        padding: 0 5px;
      }
      .checkNav {
        background-color: salmon;
        border-radius: 2px;
      }
    }
  }
  ul {
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    justify-content: space-between;
    li {
      cursor: pointer;
      flex: 1;
      width: 150px;
      height: 200px;
      margin-left: 15px;
      img {
        display: inline-block;
        width: 150px;
        height: 150px;
      }
      span {
        display: block;
      }
    }
  }
}
</style>