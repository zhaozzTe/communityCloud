Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data:{
      type:Object
    },
    url:{
      type:String
    },
    title:{
      type:String
    },
    isHasMore:{
      type:Boolean
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
    goMorePage(e){
      const url = e.currentTarget.dataset.url;
      wx.navigateTo({
        url: url+`?type=${this.data.data.typeCode}&navTitle=${this.data.data.typeCode_str}`
      })
      wx.setNavigationBarTitle({title:this.data.data.typeCode_str})
    }
  }
})
