//歌手列表底部歌手名称
<template>
  <div class="box1">
    <div class="footer">
      <span
        v-for="item in footerList"
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
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    footerList: {
      type: Array,
      deep: true,
    },
  },
}
</script>

<style lang="less" scoped>
.box1 {
  width: 950px;
  padding-left: 30px;
  padding-right: 30px;
  .footer {
    margin-top: 20px;
    border-top: 2px solid whitesmoke;
    padding: 50px 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: space-around;
    span {
      width: 165px;
      font-size: 15px;
      margin-bottom: 20px;
      cursor: pointer;
    }
    span:hover {
      text-decoration-line: underline;
    }
  }
}
</style>