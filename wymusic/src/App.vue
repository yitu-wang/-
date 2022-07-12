<template>
  <div>
    <div>
      <home></home>
    </div>
    <div>
      <musicPlay></musicPlay>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import musicPlay from '@/components/musicPlay/musicPlay.vue'
import home from '@/views/Home/home.vue'
export default {
  name: 'app',

  data() {
    return {}
  },
  components: {
    musicPlay,
    home,
  },
  methods: {},
  computed: {
    ...mapState(['totalflag']),
  },
  watch: {},
}
</script>

<style lang="less" scoped>
</style>