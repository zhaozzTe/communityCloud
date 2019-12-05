import { attend } from '../../server/common.js'
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
    hasTap:false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(e) {
      const url = e.currentTarget.dataset.url;
      wx.navigateTo({
        url:url+`?id=${this.data.data.id}`,
      })
      if(this.data.navTitle){
        wx.setNavigationBarTitle({title:this.data.navTitle})

      }
    },
    async join(e) {
      if(this.data.hasTap) return
      this.setData({hasTap:true})
      let params={
        id:this.data.data.id
      }
      try {
        let {code}=await attend(params)
        if(code==0){
          this.triggerEvent("cy", true )
        }
        this.setData({hasTap:false})
      } catch (error) {this.setData({hasTap:false})}
    }
  }
})
