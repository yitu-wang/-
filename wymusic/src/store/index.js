import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicUrl: {
      id: 0,
      url: '',
    },
    musicDetail: {
      name: '歌曲名称',
      al: {
        picUrl:
          'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      },
      ar: [{ name: '歌手名称' }, { name: '' }],
    },
    musicList: [],
    musicIdx: 0,
    squareUrl:
      'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png', //用户的头像
    activeIndex2: '1', //二级导航切换的索引
    loginShow: false, //登录组件显示
  },
  getters: {},
  mutations: {
    //获取音乐地址
    musicUrlFn(state, url) {
      state.musicUrl = url
    },
    //获取音乐详情信息
    musicDetailFn(state, value) {
      state.musicDetail = value
    },
    //向列表内推歌曲
    musicItemFn(state, list) {
      if (state.musicList.length === 0) {
        state.musicList.push(list)
      } else {
        const flag = state.musicList.every((item) => item.id !== list.id)
        if (flag) state.musicList.push(list)
      }
    },
    //清空列表
    clearMusicListFn(state) {
      state.musicList.length = 0
    },
    //把列表重新赋值
    musicListFn(state, list) {
      state.musicList = [...list]
    },
    //播放列表idx赋值
    musicIdxFn(state, count) {
      state.musicIdx = count
    },
    //二级列表索引变化
    activeIndex2Fn(state, value) {
      state.activeIndex2 = value
    },
    //修改登录
    loginShowFn(state, val) {
      state.loginShow = val
    },
    //修改用户头像
    squareUrlFn(state, val) {
      state.squareUrl = val
    },
  },
  actions: {},
  modules: {},
})
