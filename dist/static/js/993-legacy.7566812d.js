"use strict";(self["webpackChunkwymusic"]=self["webpackChunkwymusic"]||[]).push([[993],{9028:function(t,e,s){s.d(e,{Z:function(){return y}});var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"center"},[t._m(0),s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.playListMusic,stripe:""}},[s("el-table-column",{attrs:{type:"index",label:"序号",width:"100"}}),s("el-table-column",{attrs:{label:"歌名",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("div",{staticClass:"musicItem",staticStyle:{cursor:"pointer"},on:{click:function(s){return t.$router.push({path:"/discover/music",query:{id:e.row.id}})}}},[t._v(" "+t._s(e.row.name)+" ")])]}}])}),s("el-table-column",{attrs:{label:"作者",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.program?s("div",{staticClass:"musicItem",on:{click:function(s){return t.$router.push({path:"/discover/singer",query:{id:e.row.artists[0].id}})}}},[t._v(" "+t._s(e.row.artists[0].name)+" ")]):s("div",{staticClass:"musicItem",on:{click:function(s){return t.$router.push({path:"/discover/singer",query:{id:e.row.ar[0].id}})}}},[t._v(" "+t._s(e.row.ar[0].name)+" ")])]}}])}),s("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("i",{staticClass:"el-icon-video-play",attrs:{title:"播放"},on:{click:function(s){return t.musicItemPush(e.$index)}}}),s("i",{staticClass:"el-icon-share",attrs:{title:"分享"}}),s("i",{staticClass:"el-icon-download",attrs:{title:"下载"}})]}}])})],1)],1)},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"header"},[s("h3",[t._v("歌曲列表")])])}],n=s(1863),r=s(9873),c=s(1797),l=s(5598),u=s(629),o={data:function(){return{}},props:{playListMusic:{type:Array,deep:!0},program:{type:Boolean}},methods:(0,c.Z)((0,c.Z)({},(0,u.OI)(["musicListFn","musicUrlFn","musicDetailFn","musicItemFn","clearMusicListFn"])),{},{musicItemPush:function(t){var e=this;return(0,r.Z)((0,n.Z)().mark((function s(){var a,i,r;return(0,n.Z)().wrap((function(s){while(1)switch(s.prev=s.next){case 0:return a=e.playListMusic[t].id,s.next=3,(0,l._z)({id:a});case 3:return i=s.sent,e.musicUrlFn(i.data.data[0]),s.next=7,(0,l.Hk)({ids:a});case 7:r=s.sent,e.musicDetailFn(r.data.songs[0]),e.musicItemFn(r.data.songs[0]);case 10:case"end":return s.stop()}}),s)})))()}})},m=o,d=s(1001),p=(0,d.Z)(m,a,i,!1,null,"32c6347d",null),y=p.exports},4993:function(t,e,s){s.r(e),s.d(e,{default:function(){return g}});var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"box"},[t.isShow?s("PlayDetilItem",{attrs:{playListData:t.playListData,playListMusic:t.playListMusic,playComment:t.playComment,relatedPlay:t.relatedPlay}}):t._e()],1)},i=[],n=s(1863),r=s(9873),c=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"box"},[s("div",{staticClass:"container"},[s("div",{staticClass:"left"},[s("div",{staticClass:"header"},[s("div",{staticClass:"left"},[s("img",{attrs:{src:t.playListData.coverImgUrl,alt:""}})]),s("div",{staticClass:"right"},[s("h3",[t._v(t._s(t.playListData.name))]),s("div",{staticClass:"auther"},[s("img",{attrs:{src:t.playListData.creator.avatarUrl,alt:""}}),s("p",[t._v(t._s(t.playListData.creator.nickname))]),s("span",[t._v(t._s(t.formatDate(t.playListData.createTime))+" 创建")])]),s("div",{staticClass:"btn"},[s("button",[s("i",{staticClass:"el-icon-video-play",on:{click:t.playMusicFn}},[t._v(" 播放")])]),s("button",[s("i",{staticClass:"el-icon-folder-add"},[t._v(" ("+t._s(t.playListData.commentCount)+")")])]),t._m(0),s("button",[s("i",{staticClass:"el-icon-chat-line-square"},[t._v(" ("+t._s(t.playListData.subscribedCount)+")")])])]),s("div",{staticClass:"tip"},[s("p",[t._v("标签 :")]),t._l(t.playListData.tags,(function(e,a){return s("button",{key:a+"tags"},[t._v(" "+t._s(e)+" ")])}))],2),s("p",{staticClass:"text",domProps:{innerHTML:t._s(t.playListData.description)}})])]),s("MusicList",{attrs:{playListMusic:t.playListMusic}}),s("div",{staticClass:"footer center"},[t._m(1),s("div",{staticClass:"userText"},[s("img",{attrs:{src:t.squareUrl,alt:""}}),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.content,expression:"content"}],attrs:{name:"usertext",cols:"30",rows:"10"},domProps:{value:t.content},on:{input:function(e){e.target.composing||(t.content=e.target.value)}}}),s("button",{on:{click:t.addCommentFn}},[t._v("评论")])]),s("div",{staticClass:"footer"},[s("h4",[t._v("最热评论("+t._s(t.playComment.hotComments.length)+")")]),s("ul",t._l(t.playComment.hotComments,(function(e){return s("li",{key:e.commentId},[s("img",{attrs:{src:e.user.avatarUrl,alt:""}}),s("p",{staticClass:"name"},[t._v(" "+t._s(e.user.nickname)+" ")]),s("span",{staticClass:"content"},[t._v(t._s(e.content))]),s("span",{staticClass:"time"},[t._v(t._s(e.timeStr))]),s("div",{staticClass:"fun"},[s("i",{staticClass:"el-icon-thumb"}),s("span",{staticClass:"back"},[t._v("("+t._s(e.likedCount)+") | 回复")])])])})),0),s("h4",[t._v("最新评论("+t._s(t.playComment.comments.length)+")")]),s("ul",t._l(t.playComment.comments,(function(e){return s("li",{key:e.commentId},[s("img",{attrs:{src:e.user.avatarUrl,alt:""}}),s("p",{staticClass:"name"},[t._v(" "+t._s(e.user.nickname)+" ")]),s("span",{staticClass:"content"},[t._v(t._s(e.content))]),s("span",{staticClass:"time"},[t._v(t._s(e.timeStr))]),s("div",{staticClass:"fun"},[s("i",{staticClass:"el-icon-thumb"}),s("span",{staticClass:"back"},[t._v("("+t._s(e.likedCount)+") | 回复")])])])})),0)])])],1),s("div",{staticClass:"right"},[s("h4",[t._v("   喜欢这个歌单的人")]),s("ul",t._l(t.playListData.subscribers,(function(t){return s("li",{key:t.id,staticClass:"imgLi"},[s("img",{attrs:{src:t.avatarUrl,alt:""}})])})),0),s("h4",[t._v("   热门歌单")]),s("ul",t._l(t.relatedPlay,(function(e){return s("li",{key:e.id,on:{click:function(s){return t.$router.push({path:"/discover/playdetil",query:{id:e.id}})}}},[s("img",{attrs:{src:e.coverImgUrl,alt:""}}),s("h5",[t._v(t._s(e.name))]),s("span",[t._v("by: "+t._s(e.creator.nickname))])])})),0)])])])},l=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("button",[s("i",{staticClass:"el-icon-share"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"header"},[s("h3",[t._v("评论")])])}],u=s(1797),o=s(5598),m=s(629),d=s(9028),p={name:"playDetilitem",data:function(){return{content:""}},components:{MusicList:d.Z},props:{playListData:{type:Object,deep:!0},playListMusic:{type:Array,deep:!0},playComment:{type:Object,deep:!0},relatedPlay:{type:Array,deep:!0}},methods:(0,u.Z)((0,u.Z)({},(0,m.OI)(["musicListFn","musicUrlFn","musicDetailFn","musicItemFn","clearMusicListFn"])),{},{formatDate:function(t){var e=new Date(t),s=e.getFullYear(),a=e.getMonth(),i=e.getDate();e.getHours(),e.getMinutes(),e.getSeconds();return s+"-"+a+"-"+i},playMusicFn:function(){var t=this;return(0,r.Z)((0,n.Z)().mark((function e(){var s,a,i;return(0,n.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.clearMusicListFn(),t.musicListFn(t.playListMusic),s=t.playListMusic[0].id,e.next=5,(0,o._z)({id:s});case 5:return a=e.sent,t.musicUrlFn(a.data.data[0]),e.next=9,(0,o.Hk)({ids:s});case 9:i=e.sent,t.musicDetailFn(i.data.songs[0]),t.musicItemFn(i.data.songs[0]);case 12:case"end":return e.stop()}}),e)})))()},addCommentFn:function(){var t=this;return(0,r.Z)((0,n.Z)().mark((function e(){var s;return(0,n.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(""==t.content){e.next=7;break}return s=t.$route.query.id,e.next=4,(0,o.Sj)({type:2,id:s,content:t.content});case 4:e.sent,t.content="",localStorage.getItem("userid")?t.$notify({message:"评论成功",type:"success"}):t.$notify.error({message:"评论失败"});case 7:case"end":return e.stop()}}),e)})))()}}),computed:(0,u.Z)({},(0,m.rn)(["squareUrl"]))},y=p,v=s(1001),_=(0,v.Z)(y,c,l,!1,null,"365062e4",null),f=_.exports,h={name:"playDetil",components:{PlayDetilItem:f},created:function(){this.musicListTotail()},data:function(){return{playListData:{},playListMusic:[],playComment:{},relatedPlay:[],isShow:!1}},methods:{musicListTotail:function(){var t=this;return(0,r.Z)((0,n.Z)().mark((function e(){var s,a,i,r;return(0,n.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,o.Gj)({id:t.$route.query.id});case 2:return s=e.sent,t.playListData=s.data.playlist,e.next=6,(0,o.d6)({id:t.$route.query.id});case 6:return a=e.sent,t.playListMusic=a.data.songs,e.next=10,(0,o.L5)({id:t.$route.query.id});case 10:return i=e.sent,t.playComment=i.data,e.next=14,(0,o.Ap)({id:t.$route.query.id});case 14:r=e.sent,t.relatedPlay=r.data.playlists,t.isShow=!0;case 17:case"end":return e.stop()}}),e)})))()}},watch:{$route:function(){this.musicListTotail()}}},C=h,L=(0,v.Z)(C,a,i,!1,null,"5e784dee",null),g=L.exports}}]);
//# sourceMappingURL=993-legacy.7566812d.js.map