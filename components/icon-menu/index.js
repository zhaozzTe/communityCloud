// components/iconMenu/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data:{
      type: Object,
    },
    src:{
      type:String,
    },
    label:{
      type:String,
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
    gotoPage(e){
      const url = e.currentTarget.dataset.url;
      wx.navigateTo({
        url: url
      })
    }
  }
})
