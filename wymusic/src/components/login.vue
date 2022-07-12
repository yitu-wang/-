//登录组件
<template>
  <div class="loginbox">
    <div class="logi">
      <div class="qr" v-if="prShow">
        <i class="el-icon-circle-close" @click="loginShowFn(false)"></i>
        <h4>扫码登录</h4>
        <img :src="loginImg" alt="" />
        <span v-if="waitShow">等待确认</span>
        <p @click="checkLoginFn">>>其他登陆方式</p>
      </div>
      <div class="qr" v-else>
        <i class="el-icon-circle-close" @click="loginShowFn(false)"></i>
        <h4>手机登陆</h4>
        手机号：<input
          type="text"
          v-model.number="phoneCount"
          @focus="phoneCount = ''"
        />
        <button @click="getPassFn">获取验证码</button></br>
        验证码：<input
          type="text"
          v-model.number="passCount"
          @focus="passCount = ''"
        />
        <button class="loginBtn" @click="loginVerifyFn">登陆</button>
        <p @click="checkLoginFn">>>其他登陆方式</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import {
  loginQrKeyApi,
  loginQrCreateApi,
  loginQrCheckApi,
  captchaSentApi,
  captchaVerifyApi,
  loginPhoneApi,
} from '@/request/api.js'
export default {
  data() {
    return {
      key: '', //二维码key值
      loginImg: '', //二维码图片
      code: 0, //登录状态
      timer: null, //定时器
      prShow: true,
      waitShow: false, //扫码时遮罩层
      phoneCount: '请输入手机号',
      passCount: '请输入验证码',
      token: '',
    }
  },
  methods: {
    ...mapMutations(['loginShowFn', 'totalflagFn']),

    checkLoginFn() {
      this.prShow = !this.prShow
      if (this.prShow === true) {
        this.timer = window.setInterval(async () => {
          const res3 = await loginQrCheckApi({
            key: this.key,
          })
          this.code = res3.data.code
          if (this.code === 800) {
            alert('二维码过期')
            clearInterval(this.timer)
          } else if (this.code === 801) {
            this.waitShow = false
          } else if (this.code === 802) {
            this.waitShow = true
          } else if (this.code === 803) {
            this.token = res3.data.cookie
            localStorage.setItem('token', this.token)
            this.loginShowFn(false)
          }
        }, 1500)
      } else {
        clearInterval(this.timer)
      }
    },
    async getPassFn() {
      let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (reg.test(this.phoneCount)) {
        const res4 = await captchaSentApi({
          phone: this.phoneCount,
        })
      } else {
        alert('请输入正确的手机号')
      }
    },
    async loginVerifyFn() {
      let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/

      if (reg.test(this.phoneCount) && this.passCount != '') {
        const res5 = await captchaVerifyApi({
          phone: this.phoneCount,
          captcha: this.passCount,
        })
        if (res5.data.data) {
          const res6 = await loginPhoneApi({
            phone: this.phoneCount,
            captcha: this.passCount,
          })
          console.log(res6.data)
        }
      } else {
        return
      }
    },
  },
  async created() {
    const res = await loginQrKeyApi()
    this.key = res.data.data.unikey
    const res2 = await loginQrCreateApi({
      key: this.key,
      qrimg: true,
    })
    this.loginImg = res2.data.data.qrimg
    this.timer = window.setInterval(async () => {
      const res3 = await loginQrCheckApi({
        key: this.key,
      })
      this.code = res3.data.code
      if (this.code === 800) {
        alert('二维码过期')
        clearInterval(this.timer)
      } else if (this.code === 801) {
        this.waitShow = false
      } else if (this.code === 802) {
        this.waitShow = true
      } else if (this.code === 803) {
        this.token = res3.data.cookie
        localStorage.setItem('token', this.token)
        this.loginShowFn(false)
        this.$router.go(0)
      }
    }, 1500)
  },
  destroyed() {
    clearInterval(this.timer)
  },
}
</script>

<style lang="less" scoped>
.loginbox {
  .logi {
    position: fixed;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 500px;
    height: 300px;
    border-radius: 20px;
    text-align: center;
    z-index: 9999;
    background-color: white;
    h4 {
      margin-top: 30px;
    }
    img {
      margin-top: 30px;
      width: 150px;
      height: 150px;
    }
    span {
      position: absolute;
      width: 150px;
      height: 150px;
      background: white;
      top: 80px;
      text-align: center;
      line-height: 150px;
      left: 175px;
      font-size: 18px;
      opacity: 0.98;
    }
    i {
      cursor: pointer;
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 20px;
      color: rgb(159, 159, 159);
    }
    i:hover {
      color: black;
    }
    p {
      margin-top: 20px;
      cursor: pointer;
    }
    input {
      margin-top: 40px;
      width: 200px;
      border: 1px solid rgb(62, 62, 62);
      height: 30px;
      border-radius: 3px;
      padding-left: 5px;
    }
    button {
      padding: 5px 10px;
      cursor: pointer;
    }
  }
}
</style>