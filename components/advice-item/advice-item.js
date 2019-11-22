Component({
  /**
   * 组件的属性列表
   */
  properties: {
    datas:{
      type: Object
    }
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
    join(e) {
      const url = e.currentTarget.dataset.item.url;
      wx.navigateTo({
        url,
      })
      console.log(e.currentTarget.dataset.item);
    }
  }
})
