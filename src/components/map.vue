<template>
  <div :class="b()" @click.right="mapRightHandler">
    <a-button :class="b('btn')" @click="polygonFillColor">Fill Color</a-button>
     <GmapMap
      :center="mapCenter"
      :zoom="7"
      style="width: 100%; height: 100vh"
      id="googleMap"
    >
      <GmapMarker
          :key="index"
          v-for="(m, index) in mapPoints"
          :position="m.position"
      >
      </GmapMarker>
      <GmapPolygon
        :paths="polygonOptions"
        :options="options"
      ></GmapPolygon>
    </GmapMap>
  </div>
</template>

<script>
export default {
  bem: {
    b: 'component-map'
  },
  props: {
    mapCenter: {
      type: Object,
      default: () => {
        return {
          lat: 30.5812,
          lng: 104.068
        }
      }
    },
    randomList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      polygonOptions: [],
      options: {
        strokeColor: '#ffffff',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#0000ff',
        draggable: false
      }
    }
  },
  computed: {
    mapPoints: {
      get () {
        return this.randomList
      },
      set (newValue) {
        this.$emit('update', newValue)
      }
    }
  },
  methods: {
    // 右键点击
    mapRightHandler () {
      this.polygonOptions = this.mapPoints.map(item => {
        return item.position
      })
      this.mapPoints = []
    },
    // fill color
    polygonFillColor () {
      this.options.fillColor = this.color16()
    },
    // 十六进制颜色随机
    color16 () {
      return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')
    }
  }
}
</script>

<style lang="less" scoped>
  .component-map {
    position: relative;
    &__btn {
      position: absolute;
      top: 15px;
      left: 0;
      z-index: 2;
    }
  }
</style>
