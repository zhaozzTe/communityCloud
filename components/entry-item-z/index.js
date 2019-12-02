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

  },

  /**
   * 组件的方法列表
   */
  methods: {
      async gotoPage(e){
        try{
          let res = await wxTools.checkAuth()
          if(res){
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
            console.log(paramsStr);
            
            const url = e.currentTarget.dataset.url;
            wx.navigateTo({
              url: url+paramsStr
            })
            
            if(this.data.navTitle){
              wx.setNavigationBarTitle({title:this.data.navTitle})
  
            }
          }
        }catch(e){}
      }
  }
})