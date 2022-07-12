import request from './request'

//登录接口-二维码
export const loginQrKeyApi = () => {
  return request({
    url: '/login/qr/key',
    timerstamp: Date.parse(new Date()) / 1000,
  })
}
//登录接口-二维码生成接口
export const loginQrCreateApi = ({ key, qrimg }) => {
  return request({
    url: '/login/qr/create',
    params: {
      key,
      qrimg,
      timerstamp: Date.parse(new Date()) / 1000,
    },
  })
}
//登录接口-二维码检测接口
export const loginQrCheckApi = ({ key }) => {
  return request({
    url: '/login/qr/check',
    params: {
      key,
      timerstamp: Date.parse(new Date()) / 1000,
    },
  })
}
//登录接口-发送验证码
export const captchaSentApi = ({ phone }) => {
  return request({
    url: '/captcha/sent',
    params: {
      phone,
    },
  })
}
//登录接口-校验验证码
export const captchaVerifyApi = ({ phone, captcha }) => {
  return request({
    url: '/captcha/verify',
    params: {
      phone,
      captcha,
    },
  })
}
//登录接口-手机
export const loginPhoneApi = ({ phone, password, captcha }) => {
  return request({
    url: '/login/cellphone',
    params: {
      phone,
      password,
      captcha,
    },
  })
}
//登录接口-退出登录
export const loginOutApi = () => {
  return request({
    url: '/logout',
  })
}
//登录接口-获取登录状态
export const loginStateApi = () => {
  return request({
    url: '/login/status',
  })
}
//个人接口-账号信息
export const accountApi = () => {
  return request({
    url: '/user/account',
  })
}
//个人接口-获取用户歌单，关注等信息
export const userSubCountApi = () => {
  return request({
    url: '/user/subcount',
  })
}
//个人接口-收藏歌手
export const userSublistApi = () => {
  return request({
    url: '/artist/sublist',
  })
}
//个人接口-收藏的视频
export const userMvApi = () => {
  return request({
    url: '/mv/sublist',
  })
}
//用户接口-用户详情信息
export const userDetailApi = ({ uid }) => {
  return request({
    url: '/user/detail',
    params: {
      uid,
    },
  })
}
//用户接口-用户歌单
export const userPlayListApi = ({ uid, limit, offset }) => {
  return request({
    url: '/user/playlist',
    params: {
      uid,
      limit,
      offset,
    },
  })
}
//评论接口-发布评论
export const userCommentApi = ({ t = 1, type, id, content, commentId }) => {
  return request({
    url: '/comment',
    params: {
      t,
      type,
      id,
      content,
      commentId,
    },
  })
}
//轮播图接口
export const bannerApi = () => {
  return request({
    url: '/banner',
  })
}
//音乐接口-音乐url地址
export const musicUrlApi = ({ id }) => {
  return request({
    url: '/song/url',
    params: {
      id,
    },
  })
}
//音乐接口-音乐是否可用
export const musicCanApi = ({ id }) => {
  return request({
    url: '/check/music',
    params: {
      id,
    },
  })
}
//音乐接口-音乐详情
export const musicDetailApi = ({ ids }) => {
  return request({
    url: '/song/detail',
    params: {
      ids,
    },
  })
}
//音乐接口-音乐歌词
export const musicLyricApi = ({ id }) => {
  return request({
    url: '/lyric',
    params: {
      id,
    },
  })
}
//音乐接口-歌曲评论
export const musicCommentApi = ({ id, limit, offset }) => {
  return request({
    url: '/comment/music',
    params: {
      id,
      limit,
      offset,
    },
  })
}
//音乐接口-相似歌单
export const musicSameListApi = ({ id }) => {
  return request({
    url: '/simi/playlist',
    params: {
      id,
    },
  })
}
//音乐接口-相似音乐
export const musicSameApi = ({ id }) => {
  return request({
    url: '/simi/song',
    params: {
      id,
    },
  })
}
//碟片接口-新碟上市
export const newAlbumApi = ({ limit = 10, area = null, type = null }) => {
  return request({
    url: '/top/album',
    params: {
      limit,
      area,
      type,
    },
  })
}
//碟片接口-全部碟片
export const tolAlbumApi = ({ limit = 10, area = null, offset }) => {
  return request({
    url: '/album/new',
    params: {
      limit,
      area,
      offset,
    },
  })
}
//碟片接口-碟片内容
export const albumDetailApi = ({ id }) => {
  return request({
    url: '/album',
    params: {
      id,
    },
  })
}
//碟片接口-碟片评论
export const albumCommentApi = ({ id, limit = 20, offset }) => {
  return request({
    url: '/comment/album',
    params: {
      id,
      limit,
      offset,
    },
  })
}
//碟片接口-歌手其他专辑
export const otherAlbumApi = ({ id, limit = 30 }) => {
  return request({
    url: '/artist/album',
    params: {
      id,
      limit,
    },
  })
}

//歌手接口-入驻歌手
export const singerApi = ({ cat = 1001, limit = 5 }) => {
  return request({
    url: '/artist/list',
    params: {
      cat,
      limit,
    },
  })
}
//歌手接口-热门歌手
export const topSingerApi = ({ limit = 10, offset = 0 }) => {
  return request({
    url: '/top/artists',
    params: {
      limit,
      offset,
    },
  })
}
//歌手接口-歌手分类
export const singerItemApi = ({
  limit = 10,
  offset = 0,
  initial = null,
  type = -1,
  area = -1,
}) => {
  return request({
    url: '/artist/list',
    params: {
      limit, //数量
      offset, //偏移量
      initial, //首字母查询
      type, //歌手性别
      area, //韩语欧美等
    },
  })
}
//歌手接口-歌手详情
export const singerDetailApi = ({ id }) => {
  return request({
    url: '/artist/detail',
    params: {
      id,
    },
  })
}
//歌手接口-相似歌手
export const sameSingerApi = ({ id }) => {
  return request({
    url: '/simi/artist',
    params: {
      id,
    },
  })
}
//歌手接口-歌手全部单曲
export const singerMusicApi = ({ id }) => {
  return request({
    url: '/artists',
    params: {
      id,
    },
  })
}
//歌手接口-歌手专辑
export const singerAlbumcApi = ({ id, limit, offset }) => {
  return request({
    url: '/artist/album',
    params: {
      id,
      limit,
      offset,
    },
  })
}
//歌手接口-歌手Mv
export const singerMvApi = ({ id, limit, offset }) => {
  return request({
    url: '/artist/mv',
    params: {
      id,
      limit,
      offset,
    },
  })
}
//歌手接口-歌手描述
export const singerDescApi = ({ id }) => {
  return request({
    url: '/artist/desc',
    params: {
      id,
    },
  })
}
//歌单接口-全部歌单分类
export const catListPlayApi = () => {
  return request({
    url: '/playlist/catlist',
  })
}
//歌单接口-热门歌单分类
export const hotPlayApi = () => {
  return request({
    url: '/playlist/hot',
  })
}
//歌单接口-歌单
export const topPlayApi = ({
  order = null,
  cat = null,
  limit = 35,
  offset = null,
}) => {
  return request({
    url: '/top/playlist',
    params: {
      order,
      cat,
      limit,
      offset,
    },
  })
}
//歌单接口-网友精选歌单
export const highqualityApi = ({ limit }) => {
  return request({
    url: '/top/playlist/highquality',
    params: {
      limit,
    },
  })
}
//歌单接口-歌单详情
export const playDetailApi = ({ id }) => {
  return request({
    url: '/playlist/detail',
    params: {
      id,
    },
  })
}
//歌单接口-歌单评论
export const playCommentApi = ({ id, limit = 20, offset }) => {
  return request({
    url: '/comment/playlist',
    params: {
      id,
      limit,
      offset,
    },
  })
}
//歌单接口-相关推荐
export const relatedPlayApi = ({ id }) => {
  return request({
    url: '/related/playlist',
    params: {
      id,
    },
  })
}
//榜单接口-所有榜单
export const totalDiscoverApi = () => {
  return request({
    url: '/toplist',
  })
}
//榜单接口-榜单内歌曲&&歌单接口-歌单音乐
export const discoverMusicApi = ({
  id = 19723756,
  limit = null,
  offset = null,
}) => {
  return request({
    url: '/playlist/track/all',
    params: {
      id,
      limit,
      offset,
    },
  })
}
//电台接口-电台分类
export const djcatelistApi = () => {
  return request({
    url: '/dj/catelist',
  })
}
//电台接口-分类推荐
export const djrecommendApi = ({ type }) => {
  return request({
    url: '/dj/recommend/type',
    params: {
      type,
    },
  })
}
//电台接口-推荐电台
export const djprogramApi = () => {
  return request({
    url: '/dj/hot',
  })
}
//电台接口-推荐节目
export const djRecommendApi = () => {
  return request({
    url: '/program/recommend',
  })
}
//电台接口- 不同列表电台
export const djhotradioApi = ({ cateId, limit = 22, offset = 0 }) => {
  return request({
    url: '/dj/radio/hot',
    params: {
      limit,
      offset,
      cateId,
    },
  })
}
//电台节目-24小时节目榜
export const djHoursListApi = ({ limit }) => {
  return request({
    url: '/dj/program/toplist/hours',
    params: {
      limit,
    },
  })
}
//电台接口-节目详情
export const djDetailApi = ({ id }) => {
  return request({
    url: '/dj/program/detail',
    params: {
      id,
    },
  })
}
//电台接口-电台详情
export const djdetail1Api = ({ rid }) => {
  return request({
    url: '/dj/detail',
    params: {
      rid,
    },
  })
}
//电台接口-电台节目
export const djProDeApi = ({ rid, limit, offset }) => {
  return request({
    url: '/dj/program',
    params: {
      rid,
      limit,
      offset,
    },
  })
}
//电台接口-节目评论
export const djCommentApi = ({ id, limit = 40 }) => {
  return request({
    url: '/comment/dj',
    params: {
      id,
      limit,
    },
  })
}
//搜索框接口
export const searchApi = ({ keywords }) => {
  return request({
    url: '/search/suggest',
    params: {
      keywords,
    },
  })
}
