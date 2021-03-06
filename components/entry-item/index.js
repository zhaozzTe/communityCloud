// components/entry-item/index.js
import wxTools from "../../utils/wxTools.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表 typeCode_str
   */
  methods: {
    async gotoPage(e) {
      this.isHasToken();
      const navtitle = e.currentTarget.dataset.navtitle;
      const type = e.currentTarget.dataset.type;
      try {
        let res = await wxTools.checkAuth()
        if (res) {
          const url = e.currentTarget.dataset.url;
          wx.navigateTo({
            url: `/pages/comNews/index?navTitle=${navtitle}&type=${type}`
          })

        }
      } catch (e) {}
    },
    isHasToken() {
      if (wx.getStorageSync('token')) {
        this.triggerEvent('parentEvent', {
          needAuth: false
        })
      } else {
        this.triggerEvent('parentEvent', {
          needAuth: true
        });
        return false;
      }
    },
  }
})