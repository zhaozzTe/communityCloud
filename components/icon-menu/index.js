// components/iconMenu/index.js
import { getQrCodes } from '../../server/common.js'
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
    async gotoPage(e){
      try {
        let res = await getQrCodes()
        if (res.code == 0) {
          const url = e.currentTarget.dataset.url;
          wx.navigateTo({
            url: url
          })

        }
      } catch (e) { }
    }
  }
})
