Component({
  /**
   * 组件的属性列表
   */
  properties: {
    meuns: {
      type: Object
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
    gotoPage(e) {
      console.log(77777,e.currentTarget.dataset.url)
      const url = e.currentTarget.dataset.url;
      wx.navigateTo({
        url: url
      })
    }
  }
})
