import { attend } from '../../server/common.js'
import wxTools from "../../utils/wxTools.js"
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
    async toDetail(e) {
      if(this.data.hasTap) return
        this.setData({hasTap:true})
      try {
        let res = await wxTools.checkAuth()
        if(res){
          const url = e.currentTarget.dataset.url;
          wx.navigateTo({
            url:url+`?id=${this.data.data.id}&navTitle=${this.data.navTitle}`,
          })
          setTimeout(()=>{
            this.setData({hasTap:false})
          },2000)

        }
      } catch (error) {
        
      }finally{
        this.setData({hasTap:false})
      }
    },
    async join(e) {
      if(this.data.hasTap&&wxTools.checkVisitor()) return
      this.setData({hasTap:true})
      let params={
        newsId:this.data.data.id
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
