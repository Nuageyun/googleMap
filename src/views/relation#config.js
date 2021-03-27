export const tableOptions = vm => ({
  columns: [
    {
      title: 'gameId',
      scopedSlots: { customRender: 'gameId' }
    },

    {
      title: 'name',
      dataIndex: 'name'
    },
    {
      title: 'ageRestriction (mark below 16)',
      scopedSlots: { customRender: 'ageRestriction' }
    },
    {
      title: 'thumbnail',
      scopedSlots: { customRender: 'thumbnail' }
    }
  ]
})
