//歌手界面-推荐页面（主页面）
<template>
  <div class="box">
    <div class="left">
      <div class="item" v-for="(item, index) in singerList" :key="index">
        <h3>{{ item.name }}</h3>
        <ul>
          <li
            v-for="(child, idx) in item.child"
            :key="`${index}-${idx}`"
            :class="{ check: listIndex == `${index}-${idx}` }"
            @click="changeListFn(`${index}-${idx}`, child, idx, index)"
          >
            {{ child }}
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      singerList: [
        {
          name: '推荐',
          child: ['推荐歌手', '入驻歌手'],
        },
        {
          name: '华语',
          child: ['华语男歌手', '华语女歌手', '华语组合乐队'],
        },
        { name: '欧美', child: ['欧美男歌手', '欧美女歌手', '欧美组合乐队'] },
        { name: '日本', child: ['日本男歌手', '日本女歌手', '日本组合乐队'] },
        { name: '韩国', child: ['韩国男歌手', '韩国女歌手', '韩国组合乐队'] },
        { name: '其他', child: ['其他男歌手', '其他女歌手', '其他组合乐队'] },
      ],
      listIndex: '0-0',
    }
  },
  watch: {
    $route: {
      handler(to) {
        if (to.path === '/discover/artist/') {
          this.listIndex = '0-0'
        } else if (to.path === '/discover/artist/signed') {
          this.listIndex = '0-1'
        } else {
          const query = JSON.parse(JSON.stringify(this.$route.query))
          let idx1 = 0
          let idx = 0
          if (query.area == 7) {
            idx1 = 1
          } else if (query.area == 96) {
            idx1 = 2
          } else if (query.area == 8) {
            idx1 = 3
          } else if (query.area == 16) {
            idx1 = 4
          } else if (query.area == 0) {
            idx1 = 5
          }
          idx = query.type - 1
          this.listIndex = `${idx1}-${idx}`
        }
      },
      immediate: true,
    },
  },
  methods: {
    ...mapMutations(['singerCatFn']),
    changeListFn(index, item, idx, x) {
      this.singerCatFn(item)
      if (item === '入驻歌手') {
        this.$router.push({
          path: '/discover/artist/signed',
        })
      } else if (item === '推荐歌手') {
        this.$router.push({
          path: '/discover/artist/',
        })
      } else {
        let areaVal = 0
        if (x === 1) {
          areaVal = 7
        } else if (x === 2) {
          areaVal = 96
        } else if (x === 3) {
          areaVal = 8
        } else if (x === 4) {
          areaVal = 16
        } else {
          areaVal = 0
        }
        this.$router.push({
          path: '/discover/artist/cat',
          query: {
            type: idx + 1,
            area: areaVal,
            initial: -1,
          },
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.box {
  width: 1200px;
  min-height: 100%;
  margin: 0 auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .left {
    float: left;
    width: 250px;
    overflow: hidden;
    padding-top: 50px;
    background-color: whitesmoke;
    padding-bottom: 50px;
    .item {
      padding: 10px 20px;
      h3 {
        font-size: 22px;
        margin-bottom: 10px;
        cursor: default;
      }
      ul {
        padding-bottom: 20px;
        border-bottom: 2px solid rgb(134, 134, 134);

        li {
          margin-left: 20px;
          margin-top: 10px;
          font-size: 15px;
          list-style: circle;
          cursor: pointer;
        }
        li:hover {
          text-decoration-line: underline;
        }
        .check {
          border: 2px solid silver;
          border-radius: 5px;
        }
      }
    }
  }
  .right {
    display: inline-block;
  }
}
</style>