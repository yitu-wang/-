//新碟封面模板
<template>
  <div>
    <img :src="item.blurPicUrl" />
    <a href="javascript:;"></a>
    <p>{{ item.name }}</p>
    <p>{{ item.artist.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'albumItem',
  props: {
    item: {},
  },
}
</script>

<style lang="less" scoped>
div {
  margin-right: 65px;
  margin-bottom: 20px;
  width: 118px;
  height: 150px;
  position: relative;

  img {
    display: block;
    width: 100px;
    height: 100px;
  }

  a {
    position: absolute;
    top: 0;
    left: 0;
    background: url(@/assets/coverall.png);
    width: 118px;
    height: 100px;
    background-position: 0 -570px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
  }

  p {
    width: 118px;
    line-height: 20px;
    font-size: 15px;
    text-align: left;
    margin-top: 15px;
    margin-left: 5px;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  p:last-child {
    margin-top: 0px;
    font-weight: 500;
  }
}
</style>