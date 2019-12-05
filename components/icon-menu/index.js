// components/iconMenu/index.js
import wxTools from "../../utils/wxTools.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data:{
      type: Object,
    },
    params:{
      type: Object,
      value:null
    },
    width:{
      type:String,
      value:'auto'
    },
    navTitle:{
      type:String,
    },
    iconWidth:{
      type:String,
      value:'100rpx'
    },
    iconHeight:{
      type:String,
      value:'100rpx'
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
    async gotoPage(e){
      if(this.data.hasTap) return
        this.setData({hasTap:true})
      try {
        let res = await wxTools.checkAuth()
        if (res) {
          let paramsStr=''
          if(this.data.params){
            Object.keys(this.data.params).map((item,index)=>{
              if(index==0){
                paramsStr+=`?${item}=${this.data.params[item]}`
              }else{
                paramsStr+=`&${item}=${this.data.params[item]}`
              }
            })
          }
          
          const url = e.currentTarget.dataset.url;
          wx.navigateTo({
            url: url+paramsStr
          })
          setTimeout(()=>{
            this.setData({hasTap:false})
          },2000)
          if(this.data.navTitle){
            wx.setNavigationBarTitle({title:this.data.navTitle})

          }
        }
      } catch (e) {this.setData({hasTap:false}) }
    }
  }
})
