// components/entry-item/index.js
import wxTools from "../../utils/wxTools.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data:{
      type:Array
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
      async gotoPage(e){
        try{
          let res = await wxTools.checkAuth()
          if(res){
            const url = e.currentTarget.dataset.url;
            wx.navigateTo({
              url: url
            })

          }
        }catch(e){}
      }
  }
})
