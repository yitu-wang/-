"use strict";(self["webpackChunkwymusic"]=self["webpackChunkwymusic"]||[]).push([[97],{7097:function(t,n,e){e.r(n),e.d(n,{default:function(){return h}});var o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"unlogin"},[e("el-empty",{attrs:{description:"用户未登录"}},[e("el-button",{attrs:{type:"primary"},on:{click:t.myloginFn}},[t._v("登录")])],1)],1)},i=[],l=e(1797),c=e(629),r={data:function(){return{token:localStorage.getItem("token")}},methods:(0,l.Z)((0,l.Z)({},(0,c.OI)(["loginShowFn"])),{},{myloginFn:function(){this.loginShowFn(!0),this.token=localStorage.getItem("token")}}),watch:{token:{handler:function(){this.token&&this.$router.push("/my")},immediate:!0}}},s=r,u=e(1001),a=(0,u.Z)(s,o,i,!1,null,"c684ed2c",null),h=a.exports}}]);
//# sourceMappingURL=97-legacy.d0b107f6.js.map