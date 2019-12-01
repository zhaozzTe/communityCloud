Component({
  /**
   * 组件的属性列表
   */
  onShow: function () {
    console.log(1,this);
  },
  properties: {
    data:{
      type: Object
    },
    navTitle:{
      type:String,
    },
    url:{
      type:String,
      value:'/pages/story-detail/story-detail'
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
    join(e) {
      const url = e.currentTarget.dataset.url;
      wx.navigateTo({
        url:url+`?id=${this.data.data.id}`,
      })
      if(this.data.navTitle){
        wx.setNavigationBarTitle({title:this.data.navTitle})

      }
    }
  }
})
