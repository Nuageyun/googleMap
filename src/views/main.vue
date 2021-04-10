<template>
  <div :class="b()">
    <div :class="b('left')">
      <Map
        :mapCenter="mapCenter"
        :randomList="randomList"
        @update="clearMarkers" />
    </div>
    <div :class="b('right')">
      <List
        :randomList="randomList"
        @create="randomMarkers"
        @change="updateMapCenter"
      />
    </div>
  </div>
</template>

<script>
import Map from '@/components/map'
import List from '@/components/list'
export default {
  bem: {
    b: 'page-main'
  },
  data () {
    return {
      /// 默认位置定位到成都
      mapCenter: {
        lat: 30.5812,
        lng: 104.068
      },
      randomList: []
    }
  },
  components: {
    Map,
    List
  },
  methods: {
    // 生成随机500组数据
    randomMarkers (num = 500) {
      const randomList = []
      for (let i = 0; i < num; i++) {
        randomList.push({
          id: i,
          position: {
            lat: this.randomNums(1, 60),
            lng: this.randomNums(-160, 110)
          }
        })
      }
      this.randomList = randomList
    },
    // 生成范围内的随机数
    randomNums (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    // 更新地图中心点
    updateMapCenter (position) {
      this.mapCenter = position
    },
    clearMarkers (data) {
      this.randomList = data
    }
  }
}
</script>

<style lang="less" scoped>
.page-main {
  width: 100%;
  height: 100vh;
  display: flex;
  &__left {
    width: 65%;
    background: #CCC;
  }
  &__right {
    flex: 1;
  }
}
</style>
