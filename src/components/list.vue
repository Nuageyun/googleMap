<template>
  <div :class="b()">
    <div :class="b('header')">
        <a-button :class="b('right-btn')" @click="randomMarkers()">Create Makers</a-button>
      </div>
    <a-table
      :columns="columns"
      :data-source="randomList"
      rowKey="id"
      :customRow="clickRow"
      >
      <template slot="position" slot-scope="record">
        lat: {{record.lat}},lng: {{record.lng}}
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  bem: {
    b: 'component-list'
  },
  props: {
    randomList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      columns: [
        {
          dataIndex: 'id',
          title: 'ID'
        },
        {
          dataIndex: 'position',
          title: 'position',
          scopedSlots: { customRender: 'position' }
        }
      ],
      dataSource: []
    }
  },
  methods: {
    randomMarkers () {
      this.$emit('create')
    },
    clickRow (record) {
      return {
        on: {
          click: () => {
            this.$emit('change', record.position)
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .component-list {
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    &__header {
      width: 100%;
      height: 50px;
      background: #ddd;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
</style>
