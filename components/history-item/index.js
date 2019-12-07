// components/history-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data:{
      type: Object,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoDetail(e) {
      const id = this.data.data.id;
      wx.navigateTo({
        url: '/pages/service-history-detail/service-history-detail?id=' +id,
      })
    },

  }
})
