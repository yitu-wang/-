//主页
<template>
  <div class="home">
    <header>
      <div class="container">
        <!-- //左边logo -->
        <h1 class="logo">
          <a href="/#">111</a>
        </h1>
        <!-- //中间导航 -->
        <el-menu
          active-text-color="wirte"
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect1"
        >
          <el-menu-item index="1">发现音乐</el-menu-item>
          <el-menu-item index="2">我的音乐</el-menu-item>
          <el-menu-item index="3">关注</el-menu-item>
          <el-menu-item index="4">商城</el-menu-item>
          <el-menu-item index="5">音乐人</el-menu-item>
          <el-menu-item index="6">下载客户端<span>Hot</span></el-menu-item>
        </el-menu>
        <!-- //搜索框 -->
        <!-- <el-input
          prefix-icon="el-icon-search"
          placeholder="请输入内容"
          v-model="input"
          clearable
        ></el-input> -->

        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="input"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
          :trigger-on-focus="false"
        >
          <i class="el-icon-search" slot="suffix" @click="handleIconClick"> </i>
          <template slot-scope="{ item }">
            <div class="name">{{ item.name }}</div>
          </template>
        </el-autocomplete>
        <!-- //创作者中心 -->
        <el-button round>创作者中心</el-button>
        <!-- //登录||头像 -->
        <div class="userImg" v-if="imgShow">
          <el-dropdown>
            <el-avatar :src="squareUrl"></el-avatar>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的主页</el-dropdown-item>
              <el-dropdown-item>我的消息</el-dropdown-item>
              <el-dropdown-item>个人设置</el-dropdown-item>
              <el-dropdown-item>
                <span @click="noLoginFn">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <button v-else class="login" @click="loginShowFn(true)">登录</button>
        <Login v-if="loginShow"></Login>
      </div>
    </header>
    <section>
      <!-- 这是一级路由的位置 -->
      <router-view></router-view>
    </section>
    <footer>
      <div class="container">
        <div class="left">
          <p>
            网易公司版权所有©1997-2022杭州乐读科技有限公司运营：浙网文[2021]
            1186-054号
          </p>
          <span>互联网宗教信息服务许可证：浙（2022）0000120</span>
        </div>
        <div class="right">
          <div class="iconImg">
            <img src="@/assets/logo.png" />
            <span>一个标志</span>
          </div>
          <div class="iconImg">
            <img src="@/assets/logo.png" />
            <span>一个标志</span>
          </div>
          <div class="iconImg">
            <img src="@/assets/logo.png" />
            <span>一个标志</span>
          </div>
          <div class="iconImg">
            <img src="@/assets/logo.png" />
            <span>一个标志</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Login from '@/components/login.vue'
import {
  accountApi,
  userDetailApi,
  loginOutApi,
  loginStateApi,
  searchApi,
  userPlayListApi,
} from '@/request/api.js'
export default {
  name: 'home',

  data() {
    return {
      activeIndex: '1',
      input: '',
      imgShow: false,
      timeout: null, //定时器
    }
  },
  async created() {
    if (localStorage.getItem('token')) {
      this.imgShow = true
      const res = await accountApi()
      localStorage.setItem('userid', res.data.account.id)
      this.squareUrlFn(res.data.profile.avatarUrl)
    }
  },
  methods: {
    ...mapMutations(['loginShowFn', 'squareUrlFn', 'totalflagFn']),
    //一级路由导航切换
    handleSelect1(key) {
      switch (key) {
        case '1':
          this.$router.push('/discover')
          break
        case '2':
          if (localStorage.getItem('token')) {
            this.$router.push('/my')
          } else {
            this.$router.push('/myunlogin')
          }
          break
      }
    },
    //退出登录
    async noLoginFn() {
      const res2 = await loginOutApi()
      localStorage.removeItem('userid')
      localStorage.removeItem('token')
      this.imgShow = false
      this.squareUrlFn(
        'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
      )
      this.$router.go(0)
    },
    //搜索建议
    async querySearch(queryString, cb) {
      const res3 = await searchApi({ keywords: queryString })
      cb(res3.data.result.songs)
    },
    handleIconClick() {},
    //搜索建议跳转
    handleSelect(item) {
      this.$router.push({
        path: '/discover/music',
        query: { id: item.id },
      })
    },
  },
  components: {
    Login,
  },
  computed: {
    ...mapState(['loginShow', 'token', 'squareUrl']),
  },
  watch: {
    $route: {
      handler(to) {
        if (to.path.slice(0, 3) == '/my') {
          this.activeIndex = '2'
        } else if (to.path.slice(0, 3) == '/di') {
          this.activeIndex = '1'
        }
      },
      immediate: true,
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 1200px;
  margin: auto;
}

// 头部导航
header {
  background-color: #f56c6c;
  width: 100%;
  min-width: 1200px;
  height: 70px;

  //左边logo
  .logo {
    float: left;
    margin-left: 10px;
    width: 176px;
    height: 70px;
    background: url(@/assets/topbar.png);
    background-position: 0px 0px;

    a {
      float: left;
      width: 157px;
      height: 100%;
      padding-right: 20px;
      text-indent: -9999px;
    }
  }

  //中间导航
  .el-menu-demo {
    float: left;
    border: none;
    background-color: #f56c6c;
  }

  .el-menu--horizontal {
    .el-menu-item.is-active {
      color: white;
      background-color: #d34f4f;
      border-bottom: 2px solid #ffb3b3 !important;
    }

    .el-menu-item {
      font-size: 16px;
      height: 70px;
      line-height: 70px;
      color: rgb(233, 233, 233);
      position: relative;

      span {
        position: absolute;
        top: 21px;
        left: 100px;
        width: 30px;
        height: 15px;
        font-size: 10px;
        color: white;
        text-align: center;
        background-color: #ff0b0b;
        border-radius: 10px;
        line-height: 14px;
      }
    }
  }

  .el-menu--horizontal
    > .el-menu--horizontal
    > .el-menu-item:not(.is-disabled):focus,
  .el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
  .el-menu--horizontal > .el-submenu .el-submenu__title:hover {
    background-color: #d34f4f;
    color: white;
    border-bottom: 2px solid #ffb3b3 !important;
  }

  //搜索框
  .my-autocomplete {
    li {
      line-height: normal;
      padding: 7px;

      .name {
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .addr {
        font-size: 12px;
        color: #b4b4b4;
      }

      .highlighted .addr {
        color: #ddd;
      }
    }
  }
  .el-autocomplete {
    margin-left: 80px;
    float: left;
    width: 180px;
    line-height: 70px;
  }

  .el-input__icon {
    line-height: 30px;
  }

  /deep/.el-input__inner {
    border-radius: 30px;
    height: 30px;
    line-height: 30px;
  }

  //创作者中心
  .el-button {
    width: 100px;
    height: 30px;
    line-height: 0px;
    padding: 0;
    float: left;
    margin-left: 20px;
    margin-top: 20px;
    background-color: transparent;
    color: #ffffff;
    border: 1px solid #ffffff;
  }

  //用户头像||登录
  .userImg {
    float: right;
    margin-right: 20px;
    margin-top: 13px;
    cursor: pointer;
  }

  .login {
    border: none;
    font-size: 15px;
    background: transparent;
    color: #ffffff;
    line-height: 69px;
    margin-left: 20px;
    cursor: pointer;
  }
}

//底部
footer {
  bottom: 0;
  height: 150px;
  width: 100%;
  min-width: 1200px;
  background-color: #e9e9e9;

  .left {
    float: left;
    margin: 20px;
    color: #475669;
    width: 49%;

    p {
      font-size: 12px;
    }

    span {
      display: inline-block;
      margin-top: 10px;
      font-size: 12px;
    }
  }

  .right {
    float: right;
    width: 40%;

    .iconImg {
      margin-top: 20px;
      margin-right: 70px;
      display: inline-block;
      text-align: center;

      img {
        display: block;
        width: 40px;
        height: 40px;
        margin-left: 5px;
        border-radius: 100%;
        padding: 2px;
        border: 2px solid #95a2b4;
      }

      span {
        font-size: 12px;
        color: #475669;
      }
    }
  }
}
</style>