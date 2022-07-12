import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    // 一级路由
    path: '/',
    redirect: '/discover',
  },
  {
    //默认的发现音乐一级页面
    path: '/discover',
    component: () => import('@/views/discover/discover.vue'),
    children: [
      {
        //默认的推荐页面
        path: '',
        component: () => import('@/views/discover/discoverHome/home.vue'),
      },
      {
        //音乐详情页
        path: 'music',
        component: () => import('@/views/discover/musicDetil/musicDetil.vue'),
        name: 'music',
      },
      {
        //点击碟子进入碟子详情页面
        path: 'albumdetail',
        component: () => import('@/views/discover/albumDetil/albumDetil.vue'),
        props: true,
      },
      {
        //点击排行榜进入排行榜页面
        path: 'toplist',
        component: () => import('@/views/discover/topList/topList.vue'),
        props: true,
      },
      {
        //点击歌单进入歌单主页面
        path: 'playlist',
        component: () => import('@/views/discover/playList/playList.vue'),
        props: true,
        name: 'playList',
      },
      {
        //点击歌单界面进入歌单详情页
        path: 'playdetil',
        component: () => import('@/views/discover//playDetil/playDetil.vue'),
        props: true,
      },
      {
        //点击电台进入电台主页面
        path: 'djradiolist',
        component: () => import('@/views/discover/djradioList/djradioList.vue'),
        name: 'djradioList',
        children: [
          {
            //点击电台分类进入不同类型电台
            path: 'djcategory',
            component: () =>
              import('@/views/discover/djradioList/djradiocate.vue'),
            name: 'djcategory',
          },
        ],
      },
      {
        //点击电台节目进入节目详情页
        path: 'program',
        component: () => import('@/views/discover/djradioDetil/program.vue'),
        props: true,
        name: 'program',
      },
      {
        //点击电台进入电台详情
        path: 'djradiodetil',
        component: () =>
          import('@/views/discover/djradioDetil/djradioDetil.vue'),
        props: true,
        name: 'djradioDetail',
      },
      {
        //歌手主页面
        path: 'artist',
        component: () => import('@/views/discover/artist/artist.vue'),
        name: 'artist',
        children: [
          {
            path: '',
            component: () => import('@/views/discover/artist/artistHome.vue'),
            name: 'artistHome',
          },
          {
            path: 'signed',
            component: () => import('@/views/discover/artist/signed.vue'),
            name: 'signed',
          },
          {
            path: 'cat',
            component: () => import('@/views/discover/artist/cat.vue'),
            name: 'cat',
            props: true,
          },
        ],
      },
      {
        //点击歌手进入歌手详情页
        path: 'singer',
        component: () => import('@/views/discover/artist/artistDetail.vue'),
        name: 'singer',
        children: [
          {
            //歌手详情默认页面歌手热门作品
            path: '',
            component: () =>
              import('@/views/discover/artist/artistDetail/artistSing.vue'),
            name: 'artistSing',
          },
          {
            //歌手详情页歌手专辑页面
            path: 'album',
            component: () =>
              import('@/views/discover/artist/artistDetail/artistAlbum.vue'),
            name: 'artistAlbum',
          },
          {
            //歌手详情页歌手mv界面
            path: 'mv',
            component: () =>
              import('@/views/discover/artist/artistDetail/artistMv.vue'),
            name: 'artistMv',
          },
          {
            //歌手详情页歌手介绍界面
            path: 'desc',
            component: () =>
              import('@/views/discover/artist/artistDetail/artistDesc.vue'),
            name: 'artistDexc',
          },
        ],
      },
      {
        //点击新碟上架进入新碟列表
        path: 'albumlist',
        component: () => import('@/views/discover/album/albumList.vue'),
        name: 'albumList',
      },
    ],
  },
  {
    //我的音乐主页
    path: '/my',
    component: () => import('@/views/My/myHome.vue'),
    name: 'myHome',
    children: [
      {
        //默认的音乐主页
        path: 'playlist',
        component: () => import('@/views/My/myPlayList.vue'),
      },
      {
        //我的歌手界面
        path: 'artist',
        component: () => import('@/views/My/myArtist.vue'),
      },
      {
        //我的视频界面
        path: 'video',
        component: () => import('@/views/My/myVideo.vue'),
      },
    ],
  },
  {
    //我的音乐-未登录界面
    path: '/myunlogin',
    component: () => import('@/views/My/myUnLogin.vue'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
