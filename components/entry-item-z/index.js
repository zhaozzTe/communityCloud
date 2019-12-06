// components/entry-item/index.js
import wxTools from "../../utils/wxTools.js"
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
    params:{
      type: Object,
      value:null
    },
    navTitle:{
      type:String,
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
        try{
          let res = await wxTools.checkAuth()
          
          if(res){
            let paramsStr=''
            if(this.data.params){
              let params={
                ...this.data.params,
                navTitle:this.data.navTitle
              }
              Object.keys(params).map((item,index)=>{
                if(index==0){
                  paramsStr+=`?${item}=${params[item]}`
                }else{
                  paramsStr+=`&${item}=${params[item]}`
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
        }catch(e){this.setData({hasTap:false})}
      }
  }
})
